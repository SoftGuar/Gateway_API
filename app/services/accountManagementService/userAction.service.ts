
import { Config } from '../../services.config';
import { AuthenticationService } from '../authentication/authenticationService';
export interface UserActionInput {
  userId: number;
  action: string;
}

export interface UserActionRecord {
    userId: number;
    action: string;
    timestamp: string;
  }
  

export class UserActionService {
  private baseUrl: string;
  private authService: AuthenticationService = new AuthenticationService();

  constructor() {
    this.baseUrl = Config.getInstance().getUserManagementIP();
    this.authService = new AuthenticationService();
  }

  async logAction(input: UserActionInput): Promise<void> {
    const resp = await fetch(`${this.baseUrl}/history/user-actions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });

    console.log(resp.body);

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`Failed to log user action: ${resp.status} ${text}`);
    }
  }

  async getActions(token: string): Promise<UserActionRecord[]> {

    const decoded = await this.authService.verifyToken(token);
    const { userId, role } = decoded;


    const resp = await fetch(`${this.baseUrl}/history/user-actions/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`Failed to fetch user actions: ${resp.status} ${text}`);
    }
    const payload = await resp.json();
    return payload.data as UserActionRecord[];
  }
}