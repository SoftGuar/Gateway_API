import { Config } from '../services.config';
import { AdminType } from './types';


export class AdminService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = Config.getInstance().getUserManagementIP();
  }

            // POST /admins
            async createAdmin(AdminData: {
                first_name: string;
                last_name: string;
                email: string;
                password: string;
                phone?: string;
                add_by: number;
              }): Promise<AdminType> {
                const response = await fetch(`${this.baseUrl}/admins`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(AdminData)
                });
                if (!response.ok) {
                  throw new Error('Failed to create Admin');
                }
                const payload = await response.json();
                return payload.data;
              }
            
              // GET /admins
              async getAdmins(): Promise<AdminType[]> {
                const response = await fetch(`${this.baseUrl}/admins`, {
                  method: 'GET'
                });
                if (!response.ok) {
                  throw new Error('Failed to fetch admins');
                }
                const payload = await response.json();
                return payload.data;
              }
            
              // GET /admins/:id
              async getAdminById(id: string): Promise<AdminType> {
                const response = await fetch(`${this.baseUrl}/admins/${id}`, {
                  method: 'GET'
                });
                if (!response.ok) {
                  throw new Error('Failed to fetch Admin');
                }
                const payload = await response.json();
                return payload.data;
              }
            
              // PUT /admins/:id
              async updateAdmin(id: string, updateData: Partial<{
                first_name: string;
                last_name: string;
                email: string;
                password: string;
                phone?: string;
              }>): Promise<AdminType> {
                const response = await fetch(`${this.baseUrl}/admins/${id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(updateData)
                });
            
                if (!response.ok) {
                  throw new Error('Failed to update Admin');
                }
                const payload = await response.json();
                return payload.data;
              }
            
              // DELETE /admins/:id
              async deleteAdmin(id: string): Promise<{ message: string }> {
                const response = await fetch(`${this.baseUrl}/admins/${id}`, {
                  method: 'DELETE'
                });
                if (!response.ok) {
                  throw new Error('Failed to delete Admin');
                }
                return await response.json();
              }
          
          }
