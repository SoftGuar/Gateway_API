import { Config } from '../../services.config';

import { DeciderType } from './types';



export interface CreateDeciderData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
}


export class DeciderService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = Config.getInstance().getUserManagementIP();
  }

        // POST /decider
        async createDecider(DeciderData: CreateDeciderData): Promise<DeciderType> {
          const response = await fetch(`${this.baseUrl}/decider`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(DeciderData)
          });
          if (!response.ok) {
            throw new Error('Failed to create Decider');
          }
          const payload = await response.json();
          return payload.data;
        }
      
        // GET /decider
        async getDeciders(): Promise<DeciderType[]> {
          const response = await fetch(`${this.baseUrl}/decider`, {
            method: 'GET'
          });
          if (!response.ok) {
            throw new Error('Failed to fetch decider');
          }
          const payload = await response.json();
          return payload.data;
        }
      
        // GET /decider/:id
        async getDeciderById(id: string): Promise<DeciderType> {
          const response = await fetch(`${this.baseUrl}/decider/${id}`, {
            method: 'GET'
          });
          if (!response.ok) {
            throw new Error('Failed to fetch decider');
          }
          const payload = await response.json();
          return payload.data;
        }
      
        // PUT /decider/:id
        async updateDecider(id: string, updateData: Partial<CreateDeciderData>): Promise<DeciderType> {
          const response = await fetch(`${this.baseUrl}/decider/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData)
          });
      
          if (!response.ok) {
            throw new Error('Failed to update decider');
          }
          const payload = await response.json();
          return payload.data;
        }
      
        // DELETE /decider/:id
        async deleteDecider(id: string): Promise<{ message: string }> {
          const response = await fetch(`${this.baseUrl}/decider/${id}`, {
            method: 'DELETE'
          });
          if (!response.ok) {
            throw new Error('Failed to delete decider');
          }
          return await response.json();
        }
}
