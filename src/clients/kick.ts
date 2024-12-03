import axios from 'axios'

export interface KickFile {
    filename: string;
}

export interface KickMessage {
    id: string;
    session: string;
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export interface KickSession {
    id: string;
    messages: KickMessage[];
}

export class KickClient {
    axios: axios.AxiosInstance

    constructor() {
        this.axios = axios.create({ baseURL: 'https://kick.violass.club' })
    }

    async getPrompts(): Promise<KickFile[]> {
        try {
            const res = await this.axios.get('/files')

            const files: string[] = res.data.names

            return files.map((f: string) => ({filename: f}))
        }
        catch (e) {
            console.error(e)
        }

        return []
    }

    // Simulated method to get prompt content
    async getPromptContent(filename: string): Promise<string> {
        try {
            const res = await this.axios.get(`/files/${filename}`)

            return res.data
        }
        catch (e) {
            console.error(e)
        }

        return ''
    }

    async getMessages(): Promise<KickMessage[]> {
        try {
            const res = await this.axios.get('/messages', {
                headers: {
                    'Accept': 'application/json'
                }
            })

            const messages: KickMessage[] = res.data.messages

            return messages;
        }
        catch (e) {
            console.error(e);
        }

        return [];
    }

    async getSessions(): Promise<KickSession[]> {
        try {
            const res = await this.axios.get('/messages', {
                headers: {
                    'Accept': 'application/json'
                }
            })

            const sessions: KickSession[] = res.data.messages.reduce((acc: KickSession[], msg: KickMessage) => {
                const session = acc.find((s: KickSession) => s.id === msg.session);
                if (session) {
                    session.messages.push(msg);
                } else {
                    acc.push({
                        id: msg.session,
                        messages: [msg]
                    });
                }
                return acc;
            }, []);

            return sessions;
        }
        catch (e) {
            console.error(e);
        }

        return [];
    }
}
