import { 
    UserType,  
  } from '../accountManagementService/types';
  
export type DispositiveType = {
    id: number;
    type: string;
    start_date: string;
    end_date: string;
    initial_state: string;
    MAC: string;
    state: string;
    user_id: number  | null;
    product_id: number; 
    Product: ProductType; 
  };

  
  export type ProductType = {
    id: number;
    name: string;
    description: string | null;
    price: number;
  };
  
