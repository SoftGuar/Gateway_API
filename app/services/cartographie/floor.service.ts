import { appEmitter } from '../notifications/event';
import { FloorType, FloorCreateData, FloorUpdateData } from './types';

export class FloorService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // GET /floors
  async getFloors(): Promise<FloorType[]> {
    const response = await fetch(`${this.baseUrl}/floors`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch floors');
    }
    const payload = await response.json();
    return payload.data || payload;
  }

  // POST /floors
  async createFloor(floorData: FloorCreateData & { createdBy?: string }): Promise<FloorType> {
    const response = await fetch(`${this.baseUrl}/floors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(floorData)
    });
    if (!response.ok) {
      throw new Error('Failed to create floor');
    }
    // Emit event with createdBy info
    appEmitter.emit('floor.created', {
      floorName: floorData.name,
      createdBy: floorData.createdBy || 'unknown',
      environmentId: floorData.environment_id
    });
    const payload = await response.json();
    return payload.data || payload;
  }

  // GET /floors/:id
  async getFloorById(id: string): Promise<FloorType> {
    const response = await fetch(`${this.baseUrl}/floors/${id}`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch floor');
    }
    const payload = await response.json();
    return payload.data || payload;
  }

  // PUT /floors/:id
  async updateFloor(id: string, updateData: FloorUpdateData & { updatedBy?: string }): Promise<FloorType> {
    const response = await fetch(`${this.baseUrl}/floors/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    if (!response.ok) {
      throw new Error('Failed to update floor');
    }
    // Emit event with updatedBy info
    appEmitter.emit('floor.updated', {
      floorId: id,
      updatedBy: updateData.updatedBy || 'unknown',
    });
    const payload = await response.json();
    return payload.data || payload;
  }

  // GET /floors/:id/image
  async getFloorImage(id: string): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/floors/${id}/image`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch floor image');
    }
    return await response.blob();
  }
}