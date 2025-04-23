import { Config } from '../../services.config';

import { AssistanceType } from './types';




export interface CreateAssistanceData{
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
}


export class AssistanceService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = Config.getInstance().getUserManagementIP();
  }

    // POST /assistances
    async createAssistance(assistanceData: CreateAssistanceData): Promise<AssistanceType> {
      const response = await fetch(`${this.baseUrl}/assistances`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assistanceData)
      });
      if (!response.ok) {
        throw new Error('Failed to create assistance');
      }
      const payload = await response.json();
      return payload.data;
    }
  
    // GET /assistances
    async getAssistances(): Promise<AssistanceType[]> {
      const response = await fetch(`${this.baseUrl}/assistances`, {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch assistances');
      }
      const payload = await response.json();
      return payload.data;
    }
  

}
