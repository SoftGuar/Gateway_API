export enum InterventionStatus {
  done = 'done',
  inProgress = 'inProgress',
  pending = 'pending',
  rescheduled = 'rescheduled'
}
  

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
  };

  
  export type MaintainerType = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };

  export type InterventionType ={
    id :number;
    idMaintainer :number
    idDispositive :      number  
    description  :String
    type : string
    status      : InterventionStatus 
    end_date    : string
    start_date   :string 
    report       : ReportType  
  }

  export type ReportType = {
    id  :number;
    interventionId: number;
    title: string;
    description: string;
    created_at: string
  };
  


  export type DispoIssueWithMaintainerAndDispositiveType ={
    id :number;
    idMaintainer :number
    idDispositive :      number  
    description  :String
    status      : string 
    date    : string
    Maintainer  : MaintainerType 
    Dispositive  : DispositiveType
  }

  export type DispoIssueType ={
    id :number;
    idMaintainer :number
    idDispositive :      number  
    description  :String
    status      : string 
    date    : string
  }

