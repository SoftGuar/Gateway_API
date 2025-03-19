import { AccountManagementService } from '../accountManagementService/accountManagement.service';
import { 
  UserType, 
  HelperType, 
  DeciderType, 
  CommercialType, 
  MaintainerType 
} from '../accountManagementService/types';


import { CreateUserData } from '../accountManagementService/user.service';
import { CreateDeciderData } from '../accountManagementService/decider.service';
import { CreateHelperData } from '../accountManagementService/helper.service';
import { CreateCommercialData } from '../accountManagementService/commercial.service';
import { CreateMaintainerData } from '../accountManagementService/maintainer.service';

export class AdminService {
  private accountService: AccountManagementService;

  constructor() {
    this.accountService = new AccountManagementService();
  }

  // Admin creates a regular user
  async createUser(userData: CreateUserData): Promise<UserType> {
    return this.accountService.createUser(userData);
  }

  // Admin creates a helper
  async createHelper(helperData: CreateHelperData): Promise<HelperType> {
    return this.accountService.createHelper(helperData);
  }

  // Admin creates a decider
  async createDecider(deciderData: CreateDeciderData): Promise<DeciderType> {
    return this.accountService.createDecider(deciderData);
  }

  // Admin creates a commercial
  async createCommercial(commercialData: CreateCommercialData): Promise<CommercialType> {
    return this.accountService.createCommercial(commercialData);
  }

  // Admin creates a maintainer
  async createMaintainer(maintainerData: CreateMaintainerData): Promise<MaintainerType> {
    return this.accountService.createMaintainer(maintainerData);
  }
}