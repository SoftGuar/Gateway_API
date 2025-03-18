import { Config } from '../services.config';

import { MaintainerType } from './types';

export class MaintainerService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = Config.getInstance().getUserManagementIP();
  }

        // POST /maintainer
        async createMaintainer(maintainerData: {
            first_name: string;
            last_name: string;
            email: string;
            password: string;
            phone?: string;
          }): Promise<MaintainerType> {
            const response = await fetch(`${this.baseUrl}/maintainer`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(maintainerData)
            });
            if (!response.ok) {
              throw new Error('Failed to create maintainer');
            }
            const payload = await response.json();
            return payload.data;
          }
        
          // GET /maintainer
          async getMaintainers(): Promise<MaintainerType[]> {
            const response = await fetch(`${this.baseUrl}/maintainer`, {
              method: 'GET'
            });
            if (!response.ok) {
              throw new Error('Failed to fetch maintainers');
            }
            const payload = await response.json();
            return payload.data;
          }
        
          // GET /maintainer/:id
          async getMaintainerById(id: string): Promise<MaintainerType> {
            const response = await fetch(`${this.baseUrl}/maintainer/${id}`, {
              method: 'GET'
            });
            if (!response.ok) {
              throw new Error('Failed to fetch maintainer');
            }
            const payload = await response.json();
            return payload.data;
          }
        
          // PUT /maintainer/:id
          async updateMaintainer(id: string, updateData: Partial<{
            first_name: string;
            last_name: string;
            email: string;
            password: string;
            phone?: string;
          }>): Promise<MaintainerType> {
            const response = await fetch(`${this.baseUrl}/maintainer/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updateData)
            });
        
            if (!response.ok) {
              throw new Error('Failed to update maintainer');
            }
            const payload = await response.json();
            return payload.data;
          }
        
          // DELETE /maintainer/:id
          async deleteMaintainer(id: string): Promise<{ message: string }> {
            const response = await fetch(`${this.baseUrl}/maintainer/${id}`, {
              method: 'DELETE'
            });
            if (!response.ok) {
              throw new Error('Failed to delete maintainer');
            }
            return await response.json();
          }
  }
