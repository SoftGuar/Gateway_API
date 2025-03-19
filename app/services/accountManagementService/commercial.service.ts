import { Config } from '../../services.config';

import { CommercialType } from './types';

export interface CreateCommercialData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
}


export class CommercialService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = Config.getInstance().getUserManagementIP();
  }

            // POST /commercials
    async createCommercial(CommercialData: CreateCommercialData): Promise<CommercialType> {
      const response = await fetch(`${this.baseUrl}/commercials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(CommercialData)
      });
      if (!response.ok) {
        throw new Error('Failed to create Commercial');
      }
      const payload = await response.json();
      return payload.data;
    }
  
    // GET /commercials
    async getCommercials(): Promise<CommercialType[]> {
      const response = await fetch(`${this.baseUrl}/commercials`, {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch commercials');
      }
      const payload = await response.json();
      return payload.data;
    }
  
    // GET /commercials/:id
    async getCommercialById(id: string): Promise<CommercialType> {
      const response = await fetch(`${this.baseUrl}/commercials/${id}`, {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch Commercial');
      }
      const payload = await response.json();
      return payload.data;
    }
  
    // PUT /commercials/:id
    async updateCommercial(id: string, updateData: Partial<CreateCommercialData>): Promise<CommercialType> {
      const response = await fetch(`${this.baseUrl}/commercials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to update Commercial');
      }
      const payload = await response.json();
      return payload.data;
    }
  
    // DELETE /commercials/:id
    async deleteCommercial(id: string): Promise<{ message: string }> {
      const response = await fetch(`${this.baseUrl}/commercials/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete Commercial');
      }
      return await response.json();
    }

    }