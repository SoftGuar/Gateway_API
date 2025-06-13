import { EnvironmentType, EnvironmentCreateData, Floor } from './types';

export class EnvironmentService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // POST /environments
  async createEnvironment(environmentData: EnvironmentCreateData): Promise<EnvironmentType> {
    const response = await fetch(`${this.baseUrl}/environments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(environmentData)
    });
    if (!response.ok) {
      throw new Error('Failed to create environment');
    }
    const payload = await response.json();
    return payload.data || payload;
  }

  // GET /environments
  async getEnvironments(): Promise<EnvironmentType[]> {
    const response = await fetch(`${this.baseUrl}/environments`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch environments');
    }
    const payload = await response.json();
    return payload.data || payload;
  }

  // GET /environments/:id
  async getEnvironmentById(id: string): Promise<EnvironmentType> {
    const response = await fetch(`${this.baseUrl}/environments/${id}`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch environment');
    }
    const payload = await response.json();
    return payload.data || payload;
  }

  // GET /environments/:id/floors
  async getEnvironmentFloors(id: string): Promise<Floor[]> {
    const response = await fetch(`${this.baseUrl}/environments/${id}/floors`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch environment floors');
    }
    const payload = await response.json();
    return payload.data || payload;
  }
}