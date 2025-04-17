import { Config } from '../../services.config';

import { HelperRecommendationType } from './types';




export interface CreateHelperRecommendationData{
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
}

export class HelperRecommendationService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = Config.getInstance().getUserManagementIP();
  }

    // POST /helperRecommendations
    async createHelperRecommendation(helperRecommendationData: CreateHelperRecommendationData): Promise<HelperRecommendationType> {
      const response = await fetch(`${this.baseUrl}/helperRecommendations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(helperRecommendationData)
      });
      if (!response.ok) {
        throw new Error('Failed to create helperRecommendation');
      }
      const payload = await response.json();
      return payload.data;
    }
  
    // GET /helperRecommendations
    async getHelperRecommendations(): Promise<HelperRecommendationType[]> {
      const response = await fetch(`${this.baseUrl}/helperRecommendations`, {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch helperRecommendations');
      }
      const payload = await response.json();
      return payload.data;
    }
  
    // GET /helperRecommendations/:id
    async getHelperRecommendationById(id: string): Promise<HelperRecommendationType> {
      const response = await fetch(`${this.baseUrl}/helperRecommendations/${id}`, {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch helperRecommendation');
      }
      const payload = await response.json();
      return payload.data;
    }
  
    // PUT /helperRecommendations/:id
    async updateHelperRecommendation(id: string, updateData: Partial<CreateHelperRecommendationData>): Promise<HelperRecommendationType> {
      const response = await fetch(`${this.baseUrl}/helperRecommendations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to update helperRecommendation');
      }
      const payload = await response.json();
      return payload.data;
    }
  
    // DELETE /helperRecommendations/:id
    async deleteHelperRecommendation(id: string): Promise<{ message: string }> {
      const response = await fetch(`${this.baseUrl}/helperRecommendations/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete helperRecommendation');
      }
      return await response.json();
    }


    async approveRecommendation (id:string,password:string){
        const response = await fetch(`${this.baseUrl}/helperRecommendations/${id}/approve`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
    
          });
          if (!response.ok) {
            throw new Error('Failed to approve helperRecommendation');
          }

      const payload = await response.json();
      return payload.data;
    
    }

    async rejectRecommendation (id:string,notes?:string){
        const response = await fetch(`${this.baseUrl}/helperRecommendations/${id}/reject`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notes })
    
          });
          if (!response.ok) {
            throw new Error('Failed to reject helperRecommendation');
          }

      const payload = await response.json();
      return payload.data;
    
    }



}
