import { Config } from '../../services.config';
import { appEmitter } from '../notifications/event';
import { AdminType } from './types';


export interface CreateAdminData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
  privilege: number;
  add_by: number;
}


export class AdminService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = Config.getInstance().getUserManagementIP();
  }

            // POST /admins
            async createAdmin(AdminData: CreateAdminData): Promise<AdminType> {
                const response = await fetch(`${this.baseUrl}/admins`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(AdminData)
                });
                if (!response.ok) {
                  throw new Error('Failed to create Admin');
                }
                // send notification
                appEmitter.emit("user.created", {
                  type: 'Admin',
                  email: AdminData.email,
                  name: AdminData.first_name + ' ' + AdminData.last_name
                });
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
              async updateAdmin(id: string, updateData: Partial<CreateAdminData>): Promise<AdminType> {
                const response = await fetch(`${this.baseUrl}/admins/${id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(updateData)
                });
            
                if (!response.ok) {
                  throw new Error('Failed to update Admin');
                }
                // send notification
                appEmitter.emit("user.updated", {
                  type: 'ADMIN',
                  id: id,
                });
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
