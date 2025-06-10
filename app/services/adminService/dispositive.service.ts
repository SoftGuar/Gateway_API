import { Config } from '../../services.config';
import { appEmitter } from '../notifications/event';
import { DispositiveType,ProductType} from './types';


export interface CreateDispositiveData {
        type: string;
        start_date: string;
        end_date: string;
        initial_state: string;
        MAC: string;
        state: string;
        product_id:number;
}

export interface BlockDispositiveInput  {
    blocked: boolean;
  };
  


export class DispositiveService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = Config.getInstance().getadminServiceIP();
  }

            // POST /dispositives
            async createDispositive(DispositiveData: CreateDispositiveData): Promise<DispositiveType> {
                const response = await fetch(`${this.baseUrl}/dispositives`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(DispositiveData)
                });
                if (!response.ok) {
                  throw new Error('Failed to create dispositive');
                }
                const payload = await response.json();
                appEmitter.emit("device.registered",DispositiveData)
                return payload.data;
              }
            
              // GET /dispositives
              async getDispositives(): Promise<DispositiveType[]> {
                const response = await fetch(`${this.baseUrl}/dispositives`, {
                  method: 'GET'
                });
                if (!response.ok) {
                  throw new Error('Failed to fetch dispositives');
                }
                const payload = await response.json();
                return payload.data;
              }
            
              // GET /dispositives/:id
              async getDispositiveById(id: string): Promise<DispositiveType> {
                const response = await fetch(`${this.baseUrl}/dispositives/${id}`, {
                  method: 'GET'
                });
                if (!response.ok) {
                  throw new Error('Failed to fetch dispositive');
                }
                const payload = await response.json();
                return payload.data;
              }
            
              // PUT /dispositives/:id
              async updateDispositive(id: string, updateData: Partial<CreateDispositiveData>): Promise<DispositiveType> {
                const response = await fetch(`${this.baseUrl}/dispositives/${id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(updateData)
                });
            
                if (!response.ok) {
                  throw new Error('Failed to update dispositive');
                }
                const payload = await response.json();
                return payload.data;
              }
            
              // DELETE /dispositives/:id
              async deleteDispositive(id: string): Promise<{ message: string }> {
                const response = await fetch(`${this.baseUrl}/dispositives/${id}`, {
                  method: 'DELETE'
                });
                if (!response.ok) {
                  throw new Error('Failed to delete dispositive');
                }
                return await response.json();
              }

              // Assign a user to a dispositive
              async assignUser(id: string, userId: string): Promise<DispositiveType> {
                const response = await fetch(`${this.baseUrl}/dispositives/${id}/assign-user`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ user_id: userId })
                });
                if (!response.ok) {
                  throw new Error('Failed to assign user');
                }
                const payload = await response.json();
                // Run the event emission in a separate microtask (non-blocking)
                Promise.resolve().then(() => {
                  try {
                    appEmitter.emit("sale.completed", {
                      deviceId: id,
                      userId: userId,
                    });
                  } catch (error) {
                    console.error("Error emitting sale.completed event:", error);
                  }
                });
                return payload.data;
          }
              
                // Block/unblock a dispositive
                async toggleDispositiveBlock(id: string, data: BlockDispositiveInput): Promise<DispositiveType> {
                    const response = await fetch(`${this.baseUrl}/dispositives/${id}/block`, {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data)
                    });
                    if (!response.ok) {
                      throw new Error('Process failed');
                    }
                    const payload = await response.json();
                    appEmitter.emit("device.blocked",{
                      deviceId:id
                    })
                    return payload.data;
                  }

                  // GET /dispositives/product/:productId
                  async getDispositiveByProductId(productId: string): Promise<DispositiveType[]> {
                    const response = await fetch(`${this.baseUrl}/dispositives/product/${productId}`, {
                      method: 'GET'
                    });
                    if (!response.ok) {
                      throw new Error('Failed to fetch dispositives of this product');
                    }
                    const payload = await response.json();
                    return payload.data;
                  }
                
          
          }
