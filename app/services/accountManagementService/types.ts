
export type UserType = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    created_at:Date;
    updated_at:Date;
  };
  
  export type UserWithHelpersType = UserType & {
    helpers?: HelperType[];
  };
  
  export type HelperType = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    created_at:Date;
    updated_at:Date;

  };

  export type HelperRecommendationType = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    created_at:Date;
    updated_at:Date;
    user_id:number;
    status:string;
    notes:string;
  };

  
  export type DeciderType = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    created_at:Date;
    updated_at:Date;

  };
  
  export type CommercialType = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    created_at:Date;
    updated_at:Date;

  };
  
  export type MaintainerType = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    created_at:Date;
    updated_at:Date;

  };
  
  export type AdminType = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    created_at:Date;
    updated_at:Date;
    privilege: number;
    add_by: number;
  };
  
  export type SuperAdminType = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
  };