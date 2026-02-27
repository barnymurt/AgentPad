export interface NotionConnection {
  connected: boolean;
  accessToken?: string;
  workspaceId?: string;
  workspaceName?: string;
}

export interface NotionPage {
  id: string;
  title: string;
  url: string;
}

export interface NotionExportOptions {
  projectName: string;
  squadName: string;
  pages: NotionPageContent[];
  appendMode?: 'append' | 'replace';
}

export interface NotionPageContent {
  title: string;
  content: string;
}

export async function getAccessToken(): Promise<string | null> {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const encryptedToken = cookieStore.get('notion_access_token')?.value;
  
  if (!encryptedToken) {
    return null;
  }

  try {
    const crypto = require('crypto');
    const ENCRYPTION_KEY = process.env.NOTION_ENCRYPTION_KEY || 'default-dev-key-change-in-production';
    const [ivHex, encrypted] = encryptedToken.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const key = crypto.scryptSync(ENCRYPTION_KEY, 'salt', 32);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch {
    return null;
  }
}

export async function isNotionConnected(): Promise<boolean> {
  const token = await getAccessToken();
  return !!token;
}

class NotionClient {
  private baseUrl = 'https://api.notion.com/v1';
  private apiVersion = '2022-06-28';

  private async getToken(): Promise<string> {
    const token = await getAccessToken();
    if (!token) {
      throw new Error('Not connected to Notion. Please connect your Notion account first.');
    }
    return token;
  }

  async createPage(parentId: string, title: string, content: string): Promise<NotionPage> {
    const accessToken = await this.getToken();

    const response = await fetch(`${this.baseUrl}/pages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Notion-Version': this.apiVersion,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        parent: { page_id: parentId },
        properties: {
          title: {
            title: [
              {
                text: {
                  content: title
                }
              }
            ]
          }
        },
        children: this.contentToBlocks(content)
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to create Notion page: ${error.message}`);
    }

    const data = await response.json();
    
    return {
      id: data.id,
      title: title,
      url: data.url
    };
  }

  async getRootPage(): Promise<{ id: string; title: string }> {
    const accessToken = await this.getToken();

    const response = await fetch(`${this.baseUrl}/search`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Notion-Version': this.apiVersion,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filter: {
          property: 'object',
          value: 'page'
        },
        sort: {
          direction: 'descending',
          timestamp: 'last_edited_time'
        },
        page_size: 1
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get Notion pages');
    }

    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const page = data.results[0];
      const title = page.properties?.title?.title?.[0]?.plain_text || 'Untitled';
      return { id: page.id, title };
    }

    throw new Error('No pages found in Notion workspace');
  }

  async createPagesInSection(
    projectName: string, 
    sectionName: string, 
    pages: NotionPageContent[]
  ): Promise<NotionPage[]> {
    const accessToken = await this.getToken();

    const existingPages = await this.searchPages(projectName);
    let projectPageId: string;

    if (existingPages.length > 0) {
      projectPageId = existingPages[0].id;
    } else {
      const projectPage = await this.createPage('root', projectName, `Project created by AgentPad`);
      projectPageId = projectPage.id;
    }

    const sectionPage = await this.createPage(
      projectPageId, 
      sectionName, 
      `## ${sectionName}\n\nSquad export from AgentPad`
    );

    const createdPages: NotionPage[] = [sectionPage];

    for (const page of pages) {
      try {
        const created = await this.createPage(
          sectionPage.id,
          page.title,
          page.content
        );
        createdPages.push(created);
      } catch (error) {
        console.error(`Failed to create page ${page.title}:`, error);
      }
    }

    return createdPages;
  }

  private async searchPages(query: string): Promise<{ id: string; title: string }[]> {
    const accessToken = await this.getToken();

    const response = await fetch(`${this.baseUrl}/search`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Notion-Version': this.apiVersion,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query,
        filter: {
          property: 'object',
          value: 'page'
        },
        page_size: 10
      })
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    
    return (data.results || []).map((page: any) => ({
      id: page.id,
      title: page.properties?.title?.title?.[0]?.plain_text || 'Untitled'
    }));
  }

  private contentToBlocks(content: string): object[] {
    const blocks: object[] = [];
    const lines = content.split('\n');
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        blocks.push({
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: listItems.map(text => ({
              type: 'text',
              text: { content: text }
            }))
          }
        });
        listItems = [];
      }
    };

    for (const line of lines) {
      if (line.startsWith('# ')) {
        flushList();
        blocks.push({
          object: 'block',
          type: 'heading_1',
          heading_1: {
            rich_text: [
              {
                type: 'text',
                text: { content: line.replace('# ', '') }
              }
            ]
          }
        });
      } else if (line.startsWith('## ')) {
        flushList();
        blocks.push({
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [
              {
                type: 'text',
                text: { content: line.replace('## ', '') }
              }
            ]
          }
        });
      } else if (line.startsWith('### ')) {
        flushList();
        blocks.push({
          object: 'block',
          type: 'heading_3',
          heading_3: {
            rich_text: [
              {
                type: 'text',
                text: { content: line.replace('### ', '') }
              }
            ]
          }
        });
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        listItems.push(line.replace(/^[-*] /, ''));
      } else if (line.trim()) {
        flushList();
        blocks.push({
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                type: 'text',
                text: { content: line }
              }
            ]
          }
        });
      }
    }

    flushList();

    if (blocks.length === 0) {
      blocks.push({
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              type: 'text',
              text: { content: content || 'No content' }
            }
          ]
        }
      });
    }

    return blocks;
  }

  async testConnection(): Promise<boolean> {
    try {
      const token = await this.getToken();
      const response = await fetch(`${this.baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Notion-Version': this.apiVersion
        }
      });

      return response.ok;
    } catch {
      return false;
    }
  }
}

export const notionClient = new NotionClient();
