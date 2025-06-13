import { FastifyRequest } from 'fastify';

export class FloorPlanService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async processFloorPlan(request: FastifyRequest): Promise<Response> {
    // Simple proxy - on forward la requête telle quelle
    const response = await fetch(`${this.baseUrl}/process_floor_plan/`, {
      method: 'POST',
      body: request.body as BodyInit ,
      headers: {
        // Forward les headers pertinents
        'content-type': request.headers['content-type'] || '',
        'content-length': request.headers['content-length'] || '',
      },
    });

    return response;
  }
}

