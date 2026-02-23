"""
Data Source Helper Module

Provides functions for accessing data sources from skills and orchestrators.
"""

import json
import os
from pathlib import Path
from typing import Optional

DATA_SOURCES_DIR = Path(__file__).parent.parent / "data-sources"
REGISTRY_FILE = DATA_SOURCES_DIR / "registry.json"
SQUADS_FILE = DATA_SOURCES_DIR / "squads.json"
KEYCHAIN_FILE = DATA_SOURCES_DIR / "keychain.enc"


def load_json(file_path):
    """Load JSON file or return empty dict if doesn't exist."""
    if not file_path.exists():
        return {}
    with open(file_path, 'r') as f:
        return json.load(f)


def get_data_sources_for_squad(squad_name: str) -> list:
    """
    Get all data sources accessible to a given squad.
    
    Args:
        squad_name: Name of the squad (e.g., 'discovery', 'data')
    
    Returns:
        List of data source dicts accessible to the squad
    """
    registry = load_json(REGISTRY_FILE)
    squad_lower = squad_name.lower().strip()
    
    accessible = []
    for ds in registry.get("data_sources", []):
        if squad_lower in ds.get("squads", []):
            accessible.append(ds)
    
    return accessible


def get_squad_for_skill(skill_name: str) -> list:
    """
    Get all squads that contain a given skill.
    
    Args:
        skill_name: Name of the skill
    
    Returns:
        List of squad names that contain this skill
    """
    squads_data = load_json(SQUADS_FILE)
    skill_lower = skill_name.lower().strip()
    
    containing_squads = []
    for squad_id, squad_info in squads_data.get("squads", {}).items():
        if skill_lower in [s.lower() for s in squad_info.get("skills", [])]:
            containing_squads.append(squad_id)
    
    return containing_squads


def get_data_sources_for_skill(skill_name: str) -> list:
    """
    Get all data sources accessible to a skill (via its squads).
    
    Args:
        skill_name: Name of the skill
    
    Returns:
        List of data source dicts accessible to the skill
    """
    squads = get_squad_for_skill(skill_name)
    all_accessible = []
    
    for squad in squads:
        all_accessible.extend(get_data_sources_for_squad(squad))
    
    return all_accessible


def get_squad_templates() -> dict:
    """Get all available squad templates."""
    squads_data = load_json(SQUADS_FILE)
    return squads_data.get("templates", {})


def get_squad_info(squad_name: str) -> Optional[dict]:
    """Get information about a specific squad."""
    squads_data = load_json(SQUADS_FILE)
    squad_lower = squad_name.lower().strip()
    return squads_data.get("squads", {}).get(squad_lower)


def list_all_squads() -> list:
    """List all available squad names."""
    squads_data = load_json(SQUADS_FILE)
    return list(squads_data.get("squads", {}).keys())


def has_data_sources() -> bool:
    """Check if any data sources are configured."""
    registry = load_json(REGISTRY_FILE)
    return len(registry.get("data_sources", [])) > 0


def get_data_source_by_id(data_source_id: str) -> Optional[dict]:
    """Get a specific data source by ID."""
    registry = load_json(REGISTRY_FILE)
    for ds in registry.get("data_sources", []):
        if ds.get("id") == data_source_id:
            return ds
    return None
