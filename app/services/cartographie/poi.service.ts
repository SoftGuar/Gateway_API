import { POIType, POICreateData, POIUpdateData, CategoryType } from './types';

export class POIService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // POST /pois
  async createPOI(poiData: POICreateData): Promise<POIType> {
    const response = await fetch(`${this.baseUrl}/pois`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(poiData)
    });
    if (!response.ok) {
      throw new Error('Failed to create POI');
    }
    const payload = await response.json();
    return payload.data || payload;
  }

  // GET /pois/categories
  async getCategories(): Promise<CategoryType[]> {
    const response = await fetch(`${this.baseUrl}/pois/categories`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const payload = await response.json();
    return payload.data || payload;
  }

  // GET /pois/:id
  async getPOIById(id: string): Promise<POIType> {
    const response = await fetch(`${this.baseUrl}/pois/${id}`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch POI');
    }
    const payload = await response.json();
    return payload.data || payload;
  }

  // PUT /pois/:id
  async updatePOI(id: string, updateData: POIUpdateData): Promise<POIType> {
    const response = await fetch(`${this.baseUrl}/pois/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    if (!response.ok) {
      throw new Error('Failed to update POI');
    }
    const payload = await response.json();
    return payload.data || payload;
  }

  // DELETE /pois/:id
  async deletePOI(id: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/pois/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete POI');
    }
    return await response.json();
  }

  // GET /pois/search
  async searchPOIs(query: string): Promise<POIType[]> {
    const response = await fetch(`${this.baseUrl}/pois/search?query=${encodeURIComponent(query)}`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error('Failed to search POIs');
    }
    const payload = await response.json();
    return payload.data || payload;
  }

  // GET /pois/floor/:floorId
  async getPOIsByFloor(floorId: string): Promise<POIType[]> {
    const response = await fetch(`${this.baseUrl}/pois/floor/${floorId}`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch POIs by floor');
    }
    const payload = await response.json();
    return payload.data || payload;
  }
}