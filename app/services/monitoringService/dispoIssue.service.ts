import { Config } from '../../services.config';
import { DispoIssueWithMaintainerAndDispositiveType,DispoIssueType } from './types';

export interface CreateDispoIssueData {
  dispositiveId: number;
  description: string;
  date: string;
  status?: string;
  maintainerId?: number | null;
}

export interface UpdateDispoIssueData {
  dispositiveId?: number;
  description?: string;
  status?: string;
  maintainerId?: number;
}

export class DispoIssueService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = Config.getInstance().getmonitoringServiceIP();
  }

  // POST /dispoissues
  async createDispoIssue(dispoIssueData: CreateDispoIssueData): Promise<DispoIssueType> {
    const response = await fetch(`${this.baseUrl}/dispoIssue`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dispoIssueData)
    });
    if (!response.ok) {
      throw new Error('Failed to create DispoIssue');
    }
    const payload = await response.json();
    return payload.data;
  }

  // GET /dispoissues
  async getDispoIssues(): Promise<DispoIssueWithMaintainerAndDispositiveType[]> {
    const response = await fetch(`${this.baseUrl}/dispoIssue`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch DispoIssues');
    }
    const payload = await response.json();
    return payload.data;
  }

  // GET /dispoissues/:id
  async getDispoIssueById(id: string): Promise<DispoIssueWithMaintainerAndDispositiveType> {
    const response = await fetch(`${this.baseUrl}/dispoIssue/${id}`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch DispoIssue');
    }
    const payload = await response.json();
    return payload.data;
  }

  // GET /dispoissues/dispositive/:dispositiveId/issues
  async getDispoIssuesByDispositiveId(dispositiveId: string): Promise<DispoIssueWithMaintainerAndDispositiveType[]> {
    const response = await fetch(`${this.baseUrl}/dispoIssue/dispositive/${dispositiveId}/issues`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch DispoIssues for this dispositive');
    }
    const payload = await response.json();
    return payload.data;
  }

  // PATCH /dispoissues/:id/assign
  async assignMaintainer(id: string, maintainerId: number): Promise<DispoIssueWithMaintainerAndDispositiveType> {
    const response = await fetch(`${this.baseUrl}/dispoIssue/${id}/assign`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ maintainerId })
    });
    if (!response.ok) {
      throw new Error('Failed to assign maintainer');
    }
    const payload = await response.json();
    return payload.data;
  }

  // PUT /dispoissues/:id
  async updateDispoIssue(id: string, updateData: UpdateDispoIssueData): Promise<DispoIssueWithMaintainerAndDispositiveType> {
    const response = await fetch(`${this.baseUrl}/dispoIssue/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    if (!response.ok) {
      throw new Error('Failed to update DispoIssue');
    }
    const payload = await response.json();
    return payload.data;
  }

  // DELETE /dispoissues/:id
  async deleteDispoIssue(id: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/dispoIssue/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete dispoIssue');
    }
    return await response.json();
  }
}