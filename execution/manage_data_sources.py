#!/usr/bin/env python3
"""
Data Source Management CLI

Manages data sources for the Data Source Framework.
Provides add, list, remove, and link functionality with passphrase-protected encryption.

Usage:
    python manage_data_sources.py add --name "My Data" --type spreadsheet --location <url> --squads discovery
    python manage_data_sources.py list
    python manage_data_sources.py remove <id>
    python manage_data_sources.py decrypt <id>
"""

import argparse
import json
import os
import sys
import uuid
from datetime import datetime
from pathlib import Path
from getpass import getpass

try:
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    from cryptography.hazmat.primitives import hashes
    from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
    import cryptography
except ImportError:
    print("Error: cryptography package required. Install with: pip install cryptography")
    sys.exit(1)

DATA_SOURCES_DIR = Path(__file__).parent.parent / "data-sources"
REGISTRY_FILE = DATA_SOURCES_DIR / "registry.json"
SQUADS_FILE = DATA_SOURCES_DIR / "squads.json"
KEYCHAIN_FILE = DATA_SOURCES_DIR / "keychain.enc"

SALT_FILE = DATA_SOURCES_DIR / ".salt"
ITERATIONS = 100000
KEY_LENGTH = 32

VALID_URL_SCHEMES = [
    'http://', 'https://',
    'postgresql://', 'mysql://', 'mongodb://', 'sqlite://',
    'redis://', 'amqp://', 'grpc://', 'ws://', 'wss://',
    's3://', 'gs://', 'azure://',
    'file://', 'ssh://', 'ftp://'
]


def load_json(file_path, default=None):
    """Load JSON file or return default if doesn't exist."""
    if default is None:
        default = {}
    if not file_path.exists():
        return default
    with open(file_path, 'r') as f:
        return json.load(f)


def save_json(file_path, data):
    """Save data to JSON file."""
    file_path.parent.mkdir(parents=True, exist_ok=True)
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2)


def get_or_create_salt():
    """Get existing salt or create new one."""
    if SALT_FILE.exists():
        with open(SALT_FILE, 'rb') as f:
            return f.read()
    else:
        import os
        salt = os.urandom(16)
        with open(SALT_FILE, 'wb') as f:
            f.write(salt)
        os.chmod(SALT_FILE, 0o600)
        return salt


def derive_key(passphrase: str, salt: bytes) -> bytes:
    """Derive encryption key from passphrase using PBKDF2."""
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=KEY_LENGTH,
        salt=salt,
        iterations=ITERATIONS,
    )
    return kdf.derive(passphrase.encode())


def validate_location(location: str, data_type: str) -> bool:
    """Validate location URL/scheme."""
    location_lower = location.lower().strip()
    
    if data_type == 'url':
        return location_lower.startswith(('http://', 'https://'))
    
    if data_type == 'file':
        return True
    
    if data_type in ('database', 'api', 'cloud_storage', 'spreadsheet'):
        for scheme in VALID_URL_SCHEMES:
            if location_lower.startswith(scheme):
                return True
        
        if location_lower.startswith('localhost'):
            return True
        
        print(f"Warning: Location doesn't start with a recognized scheme.")
        print(f"Expected one of: {', '.join(VALID_URL_SCHEMES[:5])}...")
        response = input("Continue anyway? (y/n): ")
        return response.lower() == 'y'
    
    return True


def encrypt_value(value: str, passphrase: str, salt: bytes = None) -> tuple:
    """Encrypt a value using AES-256-GCM with per-credential salt.
    
    Returns tuple of (encrypted_data, salt) where salt is base64 encoded.
    """
    if not passphrase:
        print("Warning: No passphrase provided. Credential will NOT be encrypted.")
        return (value, "")
    
    if salt is None:
        salt = os.urandom(16)
    
    key = derive_key(passphrase, salt)
    aesgcm = AESGCM(key)
    
    nonce = os.urandom(12)
    encrypted = aesgcm.encrypt(nonce, value.encode(), None)
    
    import base64
    return (base64.b64encode(nonce + encrypted).decode(), base64.b64encode(salt).decode())


def decrypt_value(encrypted_value: str, passphrase: str, salt_b64: str = None) -> str:
    """Decrypt a value using AES-256-GCM with provided or stored salt."""
    if not passphrase:
        return encrypted_value
    
    import base64
    try:
        data = base64.b64decode(encrypted_value)
        nonce = data[:12]
        ciphertext = data[12:]
        
        if salt_b64:
            salt = base64.b64decode(salt_b64)
        else:
            salt = get_or_create_salt()
        
        key = derive_key(passphrase, salt)
        aesgcm = AESGCM(key)
        
        return aesgcm.decrypt(nonce, ciphertext, None).decode()
    except Exception as e:
        raise ValueError("Decryption failed. Wrong passphrase or corrupted data.")


def save_keychain_entry(credential_id: str, encrypted_credential: str, salt_b64: str = ""):
    """Save encrypted credential with salt to keychain."""
    keychain = load_json(KEYCHAIN_FILE, {"credentials": {}})
    keychain["credentials"][credential_id] = {
        "encrypted": encrypted_credential,
        "salt": salt_b64
    }
    save_json(KEYCHAIN_FILE, keychain)


def get_keychain_entry(credential_id: str) -> dict:
    """Get encrypted credential and salt from keychain."""
    keychain = load_json(KEYCHAIN_FILE, {"credentials": {}})
    entry = keychain["credentials"].get(credential_id, {})
    if isinstance(entry, str):
        return {"encrypted": entry, "salt": ""}
    return entry


def delete_keychain_entry(credential_id: str):
    """Delete credential from keychain."""
    keychain = load_json(KEYCHAIN_FILE, {"credentials": {}})
    if credential_id in keychain["credentials"]:
        del keychain["credentials"][credential_id]
        save_json(KEYCHAIN_FILE, keychain)


def load_squads():
    """Load squad definitions."""
    return load_json(SQUADS_FILE, {"squads": {}})


def load_registry():
    """Load data source registry."""
    return load_json(REGISTRY_FILE, {"data_sources": [], "metadata": {}})


def save_registry(registry):
    """Save data source registry."""
    registry["metadata"]["updated_at"] = datetime.now().isoformat()
    save_json(REGISTRY_FILE, registry)


def get_valid_types():
    """Return valid data source types."""
    return ["cloud_storage", "spreadsheet", "database", "api", "url", "file"]


def get_valid_squads():
    """Return list of valid squad names."""
    squads = load_squads()
    return list(squads.get("squads", {}).keys())


def validate_squads(squad_names: list) -> list:
    """Validate and return normalized squad names."""
    valid = get_valid_squads()
    normalized = []
    for sq in squad_names:
        sq_lower = sq.lower().strip()
        if sq_lower in valid:
            normalized.append(sq_lower)
        elif sq_lower.replace("-", "_") in valid:
            normalized.append(sq_lower.replace("-", "_"))
        else:
            print(f"Warning: '{sq}' is not a valid squad. Skipping.")
    return normalized


def cmd_add(args):
    """Add a new data source."""
    registry = load_registry()
    
    data_source_id = str(uuid.uuid4())[:8]
    
    if not validate_location(args.location, args.type):
        print("Error: Invalid location.")
        return 1
    
    credential_key = None
    if args.encrypt and args.type in ["database", "api", "cloud_storage"]:
        credential = getpass("Enter credential (API key, password, etc.): ")
        
        passphrase = getpass("Enter passphrase for encryption: ")
        if not passphrase:
            print("Warning: Empty passphrase. Credential will NOT be encrypted.")
            save_keychain_entry(f"cred_{data_source_id}", credential, "")
            credential_key = f"cred_{data_source_id}"
        else:
            passphrase_confirm = getpass("Confirm passphrase: ")
            if passphrase != passphrase_confirm:
                print("Error: Passphrases do not match.")
                return 1
            
            credential_key = f"cred_{data_source_id}"
            encrypted_cred, salt_b64 = encrypt_value(credential, passphrase)
            save_keychain_entry(credential_key, encrypted_cred, salt_b64)
            print(f"[*] Credential encrypted with unique salt and stored securely")
    elif args.credential and args.type in ["database", "api", "cloud_storage"]:
        print("Warning: Credential provided but encryption not enabled. Storing as plaintext.")
        credential_key = f"cred_{data_source_id}"
        save_keychain_entry(credential_key, args.credential, "")
    
    squad_list = validate_squads(args.squads) if args.squads else []
    
    data_source = {
        "id": data_source_id,
        "name": args.name,
        "type": args.type,
        "location": args.location,
        "format": args.format,
        "description": args.description or "",
        "squads": squad_list,
        "credential_key": credential_key,
        "created_at": datetime.now().isoformat(),
        "last_used": None
    }
    
    registry["data_sources"].append(data_source)
    save_registry(registry)
    
    print(f"[*] Added data source: {args.name}")
    print(f"  ID: {data_source_id}")
    print(f"  Type: {args.type}")
    print(f"  Squads: {', '.join(squad_list) if squad_list else 'None'}")
    
    return 0


def cmd_list(args):
    """List all data sources."""
    registry = load_registry()
    squads_data = load_squads()
    
    if not registry["data_sources"]:
        print("No data sources configured.")
        print("Run 'python manage_data_sources.py add' to add one.")
        return 0
    
    print(f"\n{'Data Sources':=^60}")
    print(f"{'Name':<25} {'Type':<15} {'Squads':<20}")
    print("-" * 60)
    
    for ds in registry["data_sources"]:
        squads = ", ".join(ds.get("squads", [])) or "-"
        print(f"{ds['name']:<25} {ds['type']:<15} {squads:<20}")
    
    print(f"\nTotal: {len(registry['data_sources'])} data source(s)")
    
    if args.verbose:
        print("\n--- Detailed View ---")
        for ds in registry["data_sources"]:
            print(f"\n[{ds['id']}] {ds['name']}")
            print(f"  Type: {ds['type']}")
            print(f"  Location: {ds['location']}")
            print(f"  Format: {ds.get('format', '-')}")
            print(f"  Squads: {', '.join(ds.get('squads', [])) or 'None'}")
            print(f"  Created: {ds.get('created_at', '-')}")
            print(f"  Last used: {ds.get('last_used', 'Never')}")
    
    return 0


def cmd_remove(args):
    """Remove a data source."""
    registry = load_registry()
    
    ds_id = args.id
    ds_to_remove = None
    ds_index = None
    
    for i, ds in enumerate(registry["data_sources"]):
        if ds["id"] == ds_id:
            ds_to_remove = ds
            ds_index = i
            break
    
    if not ds_to_remove:
        print(f"Error: Data source '{ds_id}' not found.")
        return 1
    
    if not args.force:
        confirm = input(f"Remove '{ds_to_remove['name']}'? (y/n): ")
        if confirm.lower() != 'y':
            print("Cancelled.")
            return 0
    
    if ds_to_remove.get("credential_key"):
        delete_keychain_entry(ds_to_remove["credential_key"])
        print("[*] Credential removed from keychain")
    
    registry["data_sources"].pop(ds_index)
    save_registry(registry)
    
    print(f"[*] Removed data source: {ds_to_remove['name']}")
    return 0


def cmd_decrypt(args):
    """Decrypt and display a credential."""
    registry = load_registry()
    
    ds_id = args.id
    ds = None
    
    for d in registry["data_sources"]:
        if d["id"] == ds_id:
            ds = d
            break
    
    if not ds:
        print(f"Error: Data source '{ds_id}' not found.")
        return 1
    
    if not ds.get("credential_key"):
        print(f"No credential stored for '{ds['name']}'.")
        return 1
    
    keychain_entry = get_keychain_entry(ds["credential_key"])
    if not keychain_entry:
        print("Error: Credential not found in keychain.")
        return 1
    
    encrypted = keychain_entry.get("encrypted", "")
    salt_b64 = keychain_entry.get("salt", "")
    
    if not salt_b64:
        print(f"\n[*] Credential for '{ds['name']}' (stored plaintext):")
        print(f"  {encrypted}")
        return 0
    
    passphrase = getpass("Enter passphrase: ")
    
    try:
        decrypted = decrypt_value(encrypted, passphrase, salt_b64)
        print(f"\n[*] Decrypted credential for '{ds['name']}':")
        print(f"  {decrypted}")
    except ValueError as e:
        print(f"Error: {e}")
        return 1
    
    ds["last_used"] = datetime.now().isoformat()
    save_registry(registry)
    
    return 0


def cmd_squads(args):
    """List available squads."""
    squads_data = load_squads()
    
    print(f"\n{'Available Squads':=^60}")
    
    for squad_id, squad_info in squads_data.get("squads", {}).items():
        print(f"\n[{squad_id}] {squad_info.get('name', squad_id)}")
        print(f"  Description: {squad_info.get('description', 'N/A')}")
        print(f"  Example data: {squad_info.get('example_data_sources', 'N/A')}")
        print(f"  Skills: {len(squad_info.get('skills', []))}")
    
    templates = squads_data.get("templates", {})
    if templates:
        print(f"\n{'Templates':-^60}")
        for template_id, template_info in templates.items():
            print(f"  [{template_id}] {template_info.get('name')}: {', '.join(template_info.get('squads', []))}")
    
    return 0


def cmd_check_access(args):
    """Check which data sources a squad can access."""
    registry = load_registry()
    squad_name = args.squad.lower()
    
    print(f"\nData sources accessible by '{squad_name}' squad:\n")
    
    accessible = []
    for ds in registry["data_sources"]:
        if squad_name in ds.get("squads", []):
            accessible.append(ds)
    
    if not accessible:
        print("  None")
        return 0
    
    for ds in accessible:
        print(f"  • {ds['name']} ({ds['type']})")
    
    return 0


def main():
    parser = argparse.ArgumentParser(
        description="Data Source Management CLI",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s add --name "Analytics DB" --type database --location "postgresql://localhost/mydb" --squads data
  %(prog)s list
  %(prog)s remove abc12345
  %(prog)s squads
  %(prog)s check-access --squad discovery
        """
    )
    
    subparsers = parser.add_subparsers(dest="command", help="Available commands")
    
    parser_add = subparsers.add_parser("add", help="Add a new data source")
    parser_add.add_argument("--name", required=True, help="Data source name")
    parser_add.add_argument("--type", required=True, choices=get_valid_types(), help="Data source type")
    parser_add.add_argument("--location", required=True, help="URL, connection string, or path")
    parser_add.add_argument("--format", help="Format (e.g., google_sheet, postgres)")
    parser_add.add_argument("--description", help="Description")
    parser_add.add_argument("--squads", nargs="+", help="Squads that can access this data source")
    parser_add.add_argument("--encrypt", action="store_true", help="Encrypt credential with passphrase")
    parser_add.add_argument("--credential", help="[DEPRECATED - will prompt interactively] Credential value")
    
    parser_list = subparsers.add_parser("list", help="List all data sources")
    parser_list.add_argument("-v", "--verbose", action="store_true", help="Show detailed information")
    
    parser_remove = subparsers.add_parser("remove", help="Remove a data source")
    parser_remove.add_argument("id", help="Data source ID")
    parser_remove.add_argument("-f", "--force", action="store_true", help="Skip confirmation")
    
    parser_decrypt = subparsers.add_parser("decrypt", help="Decrypt and display credential")
    parser_decrypt.add_argument("id", help="Data source ID")
    
    parser_squads = subparsers.add_parser("squads", help="List available squads")
    
    parser_check = subparsers.add_parser("check-access", help="Check data sources for a squad")
    parser_check.add_argument("--squad", required=True, help="Squad name")
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        return 1
    
    commands = {
        "add": cmd_add,
        "list": cmd_list,
        "remove": cmd_remove,
        "decrypt": cmd_decrypt,
        "squads": cmd_squads,
        "check-access": cmd_check_access,
    }
    
    return commands[args.command](args)


if __name__ == "__main__":
    sys.exit(main())
