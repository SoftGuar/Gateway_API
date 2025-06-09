import { Config } from '../../services.config';
import { appEmitter } from '../notifications/event';
import { InterventionStatus,InterventionType, ReportType } from './types';


export interface CreateInterventionData {
  idMaintainer: number;
  idDispositive: number;
  description: string;
  type: string;
  status: InterventionStatus;
  end_date: string;
  start_date: string;
}

export interface UpdateInterventionData {
  idMaintainer?: number;
  idDispositive?: number;
  description?: string;
  type?: string;
  status?: InterventionStatus;
  end_date?: string;
  start_date?: string;
}

export interface UpdateReportData {
  title: string;
  description: string;
}


export class InterventionService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = Config.getInstance().getmonitoringServiceIP();
  }

  // POST /intervention
  async createIntervention(interventionData: CreateInterventionData): Promise<InterventionType> {
    const response = await fetch(`${this.baseUrl}/intervention`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(interventionData)
    });
    if (!response.ok) {
      throw new Error('Failed to create intervention');
    }
    const payload = await response.json();
    // send notification
    appEmitter.emit("Intervention.created", interventionData);
    return payload.data;
  }

  // GET /intervention
  async getInterventions(): Promise<InterventionType[]> {
    const response = await fetch(`${this.baseUrl}/intervention`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch interventions');
    }
    const payload = await response.json();
    return payload.data;
  }

  // GET /intervention/:id
  async getInterventionById(id: string): Promise<InterventionType> {
    const response = await fetch(`${this.baseUrl}/intervention/${id}`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch intervention');
    }
    const payload = await response.json();
    return payload.data;
  }

  // GET /intervention/maintainer/:idMaintainer
  async getInterventionsByMaintainerId(idMaintainer: string): Promise<InterventionType[]> {
    const response = await fetch(`${this.baseUrl}/intervention/maintainer/${idMaintainer}`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch maintainer interventions');
    }
    const payload = await response.json();
    return payload.data;
  }

  // PUT /intervention/:id
  async updateIntervention(id: string, updateData: UpdateInterventionData): Promise<InterventionType> {
    const response = await fetch(`${this.baseUrl}/intervention/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    if (!response.ok) {
      throw new Error('Failed to update intervention');
    }
    const payload = await response.json();
    return payload.data;
  }

  // PATCH /intervention/:id/status
  async updateInterventionStatus(id: string, status: InterventionStatus): Promise<InterventionType> {
    const response = await fetch(`${this.baseUrl}/intervention/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!response.ok) {
      throw new Error('Failed to update intervention status');
    }
    const payload = await response.json();
    return payload.data;
  }
    // PUT /intervention/:id/report
    async updateInterventionReport(id: string, data: UpdateReportData): Promise<ReportType> {
      const response = await fetch(`${this.baseUrl}/intervention/${id}/report`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( data )
      });
      if (!response.ok) {
        throw new Error('Failed to update intervention report');
      }
      const payload = await response.json();
      return payload.data;
    }
  

  // DELETE /intervention/:id
  async deleteIntervention(id: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/intervention/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete intervention');
    }
    return await response.json();
  }
}