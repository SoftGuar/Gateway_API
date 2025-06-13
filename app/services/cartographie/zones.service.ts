import { ZoneType, ZoneCreateData, ZoneUpdateData, ZoneTypeResponse } from './types';

export class ZoneService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // POST /zones
  async createZone(zoneData: ZoneCreateData): Promise<ZoneType> {
    const response = await fetch(`${this.baseUrl}/zones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(zoneData)
    });
    if (!response.ok) {
      throw new Error('Failed to create zone');
    }
    const payload = await response.json();
    return payload.data || payload;
  }

  // GET /zones/types
  async getZoneTypes(): Promise<ZoneTypeResponse[]> {
    const response = await fetch(`${this.baseUrl}/zones/types`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch zone types');
    }
    const payload = await response.json();
    return payload.data || payload;
  }

  // GET /zones/:id
  async getZoneById(id: string): Promise<ZoneType> {
    const response = await fetch(`${this.baseUrl}/zones/${id}`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch zone');
    }
    const payload = await response.json();
    return payload.data || payload;
  }

  // PUT /zones/:id
  async updateZone(id: string, updateData: ZoneUpdateData): Promise<ZoneType> {
    const response = await fetch(`${this.baseUrl}/zones/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    if (!response.ok) {
      throw new Error('Failed to update zone');
    }
    const payload = await response.json();
    return payload.data || payload;
  }

  // DELETE /zones/:id
  async deleteZone(id: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/zones/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete zone');
    }
    return await response.json();
  }

  // GET /zones/floor/:floorId
  async getZonesByFloor(floorId: string): Promise<ZoneType[]> {
    const response = await fetch(`${this.baseUrl}/zones/floor/${floorId}`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch zones by floor');
    }
    const payload = await response.json();
    return payload.data || payload;
  }
}