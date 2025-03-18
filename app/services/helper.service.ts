import { Config } from '../services.config';

import { HelperType } from './types';

export class HelperService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = Config.getInstance().getUserManagementIP();
  }

    // POST /helpers
    async createHelper(helperData: {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      phone?: string;
    }): Promise<HelperType> {
      const response = await fetch(`${this.baseUrl}/helpers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(helperData)
      });
      if (!response.ok) {
        throw new Error('Failed to create helper');
      }
      const payload = await response.json();
      return payload.data;
    }
  
    // GET /helpers
    async getHelpers(): Promise<HelperType[]> {
      const response = await fetch(`${this.baseUrl}/helpers`, {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch helpers');
      }
      const payload = await response.json();
      return payload.data;
    }
  
    // GET /helpers/:id
    async getHelperById(id: string): Promise<HelperType> {
      const response = await fetch(`${this.baseUrl}/helpers/${id}`, {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch helper');
      }
      const payload = await response.json();
      return payload.data;
    }
  
    // PUT /helpers/:id
    async updateHelper(id: string, updateData: Partial<{
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      phone?: string;
    }>): Promise<HelperType> {
      const response = await fetch(`${this.baseUrl}/helpers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to update helper');
      }
      const payload = await response.json();
      return payload.data;
    }
  
    // DELETE /helpers/:id
    async deleteHelper(id: string): Promise<{ message: string }> {
      const response = await fetch(`${this.baseUrl}/helpers/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete helper');
      }
      return await response.json();
    }
}
