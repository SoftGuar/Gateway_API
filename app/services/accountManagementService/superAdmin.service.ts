// app/services/superAdminService/superAdmin.service.ts
import { Config } from '../../services.config';
import { SuperAdminType } from './types';


export class SuperAdminService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = Config.getInstance().getUserManagementIP();
  }

  // GET /superadmins/:id
  async getSuperAdminById(id: string): Promise<SuperAdminType> {
    const response = await fetch(`${this.baseUrl}/superadmins/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch SuperAdmin: ${response.status}`);
    }
    
    const payload = await response.json();
    return payload.data;
  }
}