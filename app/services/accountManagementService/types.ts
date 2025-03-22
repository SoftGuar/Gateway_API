
export type UserType = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
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
  };
  
  export type DeciderType = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
  };
  
  export type CommercialType = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
  };
  
  export type MaintainerType = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
  };
  
  export type AdminType = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
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