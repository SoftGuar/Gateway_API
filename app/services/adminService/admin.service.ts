import { AccountManagementService } from '../accountManagementService/accountManagement.service';
import { 
  UserType, 
  HelperType, 
  DeciderType, 
  CommercialType, 
  MaintainerType 
} from '../accountManagementService/types';

export class AdminService {
  private accountService: AccountManagementService;

  constructor() {
    this.accountService = new AccountManagementService();
  }

  // Admin creates a regular user
  async createUser(userData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
  }): Promise<UserType> {
    return this.accountService.createUser(userData);
  }

  // Admin creates a helper
  async createHelper(helperData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
  }): Promise<HelperType> {
    return this.accountService.createHelper(helperData);
  }

  // Admin creates a decider
  async createDecider(deciderData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
  }): Promise<DeciderType> {
    return this.accountService.createDecider(deciderData);
  }

  // Admin creates a commercial
  async createCommercial(commercialData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
  }): Promise<CommercialType> {
    return this.accountService.createCommercial(commercialData);
  }

  // Admin creates a maintainer
  async createMaintainer(maintainerData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
  }): Promise<MaintainerType> {
    return this.accountService.createMaintainer(maintainerData);
  }
}