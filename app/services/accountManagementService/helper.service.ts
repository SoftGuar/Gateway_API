import { Config } from '../../services.config';
import { appEmitter } from '../notifications/event';

import { HelperType } from './types';




export interface CreateHelperData{
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
}


export class HelperService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = Config.getInstance().getUserManagementIP();
  }

    // POST /helpers
    async createHelper(helperData: CreateHelperData): Promise<HelperType> {
      const response = await fetch(`${this.baseUrl}/helpers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(helperData)
      });
      if (!response.ok) {
        throw new Error('Failed to create helper');
      }
      // send notification
      appEmitter.emit("user.created", {
        type: 'Helper',
        email: helperData.email,
        name: helperData.first_name + ' ' + helperData.last_name
      });
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
    async updateHelper(id: string, updateData: Partial<CreateHelperData>): Promise<HelperType> {
      const response = await fetch(`${this.baseUrl}/helpers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to update helper');
      }
      // send notification
      appEmitter.emit("user.updated", {
        type: 'HELPER',
        id: id,
      });
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

      // GET /helpers/:id/users
  async getHelperUsers(id: string): Promise<HelperType[]> {
    const response = await fetch(`${this.baseUrl}/helpers/${id}/users`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error('Failed to get helper users');
    }
    const payload = await response.json();
    return payload.data;
  }

}
