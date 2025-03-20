import { Config } from '../../services.config';
import { ProductType } from './types';


export interface CreateProductData {
    name: string;
    description: string | null;
    price: number;
}


export class ProductService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = Config.getInstance().getadminServiceIP();
  }

            // POST /Products
            async createProduct(ProductData: CreateProductData): Promise<ProductType> {
                const response = await fetch(`${this.baseUrl}/products`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(ProductData)
                });
                if (!response.ok) {
                  throw new Error('Failed to create Product');
                }
                const payload = await response.json();
                return payload.data;
              }
            
              // GET /Products
              async getProducts(): Promise<ProductType[]> {
                const response = await fetch(`${this.baseUrl}/products`, {
                  method: 'GET'
                });
                if (!response.ok) {
                  throw new Error('Failed to fetch Products');
                }
                const payload = await response.json();
                return payload.data;
              }
            
              // GET /Products/:id
              async getProductById(id: string): Promise<ProductType> {
                const response = await fetch(`${this.baseUrl}/products/${id}`, {
                  method: 'GET'
                });
                if (!response.ok) {
                  throw new Error('Failed to fetch Product');
                }
                const payload = await response.json();
                return payload.data;
              }
            
              // PUT /Products/:id
              async updateProduct(id: string, updateData: Partial<CreateProductData>): Promise<ProductType> {
                const response = await fetch(`${this.baseUrl}/products/${id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(updateData)
                });
            
                if (!response.ok) {
                  throw new Error('Failed to update Product');
                }
                const payload = await response.json();
                return payload.data;
              }
            
              // DELETE /Products/:id
              async deleteProduct(id: string): Promise<{ message: string }> {
                const response = await fetch(`${this.baseUrl}/products/${id}`, {
                  method: 'DELETE'
                });
                if (!response.ok) {
                  throw new Error('Failed to delete Product');
                }
                return await response.json();
              }
          
          }
