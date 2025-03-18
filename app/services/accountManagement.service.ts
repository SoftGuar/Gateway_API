import { Config } from '../services.config';
import { UserService } from './user.service';
import { HelperService } from './helper.service';
import { DeciderService } from './decider.service';
import { CommercialService } from './commercial.service';
import { MaintainerService } from './maintainer.service';
import { AdminService } from './admin.service';

import { 
  UserType, 
  UserWithHelpersType, 
  HelperType, 
  DeciderType, 
  CommercialType, 
  MaintainerType, 
  AdminType 
} from './types';

export class AccountManagementService {
  private userService: UserService;
  private helperService: HelperService;
  private deciderService: DeciderService;
  private CommercialService: CommercialService;
  private maintainerService: MaintainerService;
  private adminService: AdminService;

  constructor() {
    this.userService = new UserService();
    this.helperService = new HelperService();
    this.deciderService = new DeciderService();
    this.CommercialService = new CommercialService();
    this.maintainerService = new MaintainerService();
    this.adminService = new AdminService();
  }

  // User methods
  async createUser(userData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
  }): Promise<UserType> {
    return this.userService.createUser(userData);
  }

  async getUsers(): Promise<UserWithHelpersType[]> {
    return this.userService.getUsers();
  }

  async getUserById(id: string): Promise<UserWithHelpersType> {
    return this.userService.getUserById(id);
  }

  async updateUser(id: string, updateData: Partial<{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
  }>): Promise<UserType> {
    return this.userService.updateUser(id, updateData);
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    return this.userService.deleteUser(id);
  }

  async getUserHelpers(id: string): Promise<HelperType[]> {
    return this.userService.getUserHelpers(id);
  }

  async addHelperToUser(id: string, helperId: string): Promise<UserWithHelpersType> {
    return this.userService.addHelperToUser(id, helperId);
  }

  async removeHelperFromUser(id: string, helperId: string): Promise<UserWithHelpersType> {
    return this.userService.removeHelperFromUser(id, helperId);
  }

  // Helper methods
  async createHelper(helperData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
  }): Promise<HelperType> {
    return this.helperService.createHelper(helperData);
  }

  async getHelpers(): Promise<HelperType[]> {
    return this.helperService.getHelpers();
  }

  async getHelperById(id: string): Promise<HelperType> {
    return this.helperService.getHelperById(id);
  }

  async updateHelper(id: string, updateData: Partial<{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
  }>): Promise<HelperType> {
    return this.helperService.updateHelper(id, updateData);
  }

  async deleteHelper(id: string): Promise<{ message: string }> {
    return this.helperService.deleteHelper(id);
  }

  // Decider methods
  async createDecider(deciderData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
  }): Promise<DeciderType> {
    return this.deciderService.createDecider(deciderData);
  }

  async getDeciders(): Promise<DeciderType[]> {
    return this.deciderService.getDeciders();
  }

  async getDeciderById(id: string): Promise<DeciderType> {
    return this.deciderService.getDeciderById(id);
  }

  async updateDecider(id: string, updateData: Partial<{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
  }>): Promise<DeciderType> {
    return this.deciderService.updateDecider(id, updateData);
  }

  async deleteDecider(id: string): Promise<{ message: string }> {
    return this.deciderService.deleteDecider(id);
  }

  // Commercial methods
  async createCommercial(CommercialData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
  }): Promise<CommercialType> {
    return this.CommercialService.createCommercial(CommercialData);
  }

  async getCommercials(): Promise<CommercialType[]> {
    return this.CommercialService.getCommercials();
  }

  async getCommercialById(id: string): Promise<CommercialType> {
    return this.CommercialService.getCommercialById(id);
  }

  async updateCommercial(id: string, updateData: Partial<{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
  }>): Promise<CommercialType> {
    return this.CommercialService.updateCommercial(id, updateData);
  }

  async deleteCommercial(id: string): Promise<{ message: string }> {
    return this.CommercialService.deleteCommercial(id);
  }

  // Maintainer methods
  async createMaintainer(maintainerData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
  }): Promise<MaintainerType> {
    return this.maintainerService.createMaintainer(maintainerData);
  }

  async getMaintainers(): Promise<MaintainerType[]> {
    return this.maintainerService.getMaintainers();
  }

  async getMaintainerById(id: string): Promise<MaintainerType> {
    return this.maintainerService.getMaintainerById(id);
  }

  async updateMaintainer(id: string, updateData: Partial<{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
  }>): Promise<MaintainerType> {
    return this.maintainerService.updateMaintainer(id, updateData);
  }

  async deleteMaintainer(id: string): Promise<{ message: string }> {
    return this.maintainerService.deleteMaintainer(id);
  }

  // Admin methods
  async createAdmin(adminData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
    add_by: number;
  }): Promise<AdminType> {
    return this.adminService.createAdmin(adminData);
  }

  async getAdmins(): Promise<AdminType[]> {
    return this.adminService.getAdmins();
  }

  async getAdminById(id: string): Promise<AdminType> {
    return this.adminService.getAdminById(id);
  }

  async updateAdmin(id: string, updateData: Partial<{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
  }>): Promise<AdminType> {
    return this.adminService.updateAdmin(id, updateData);
  }

  async deleteAdmin(id: string): Promise<{ message: string }> {
    return this.adminService.deleteAdmin(id);
  }
}