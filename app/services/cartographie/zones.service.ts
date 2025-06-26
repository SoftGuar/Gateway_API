import { appEmitter } from '../notifications/event';
import { ZoneType, ZoneCreateData, ZoneUpdateData, ZoneTypeResponse } from './types';

export class ZoneService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // POST /zones
  async createZone(zoneData: ZoneCreateData & { createdBy?: string }): Promise<ZoneType> {
    const response = await fetch(`${this.baseUrl}/zones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(zoneData)
    });
    if (!response.ok) {
      throw new Error('Failed to create zone');
    }
    // Emit event with createdBy info
    appEmitter.emit('zone.created', {
      zoneName: zoneData.name,
      createdBy: zoneData.createdBy || 'unknown',
    });
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
  async updateZone(id: string, updateData: ZoneUpdateData & { updatedBy?: string }): Promise<ZoneType> {
    const response = await fetch(`${this.baseUrl}/zones/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    if (!response.ok) {
      throw new Error('Failed to update zone');
    }
    // Emit event with updatedBy info
    appEmitter.emit('zone.updated', {
      zoneName: updateData.name,
      updatedBy: updateData.updatedBy || 'unknown',
    });
    const payload = await response.json();
    return payload.data || payload;
  }

  // DELETE /zones/:id
  async deleteZone(id: string, deletedBy: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/zones/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete zone');
    }
    // Emit event for zone deletion
    appEmitter.emit('zone.deleted', { zoneId: id, deletedBy:  deletedBy });
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