import { AuthenticationService } from '../authentication/authenticationService';
import { AccountManagementService } from '../accountManagementService/accountManagement.service';
import { 
  UserType,
  HelperType,
  CommercialType,
  AdminType,
  MaintainerType,
  DeciderType,
  SuperAdminType 
} from '../accountManagementService/types';

import { UserActionService } from "../accountManagementService/userAction.service";


const userActionService = new UserActionService();

type ProfileGetter = (userId: string) => Promise<UserType | HelperType | CommercialType | AdminType | MaintainerType | DeciderType | SuperAdminType>;
type ProfileUpdater = (
  userId: string, 
  updateData: Partial<UserType & HelperType & CommercialType & AdminType & MaintainerType & DeciderType & SuperAdminType>
) => Promise<UserType | HelperType | CommercialType | AdminType | MaintainerType | DeciderType | SuperAdminType>;
type ProfileDeleter = (userId: string) => Promise<{ message: string }>;

export class AccountService {
  private authService: AuthenticationService;
  private accountManagementService: AccountManagementService;

  constructor() {
    this.authService = new AuthenticationService();
    this.accountManagementService = new AccountManagementService();
  }

  async getProfile(token: string): Promise<UserType | HelperType | CommercialType | AdminType | MaintainerType | DeciderType | SuperAdminType> {
    try {
      const decoded = await this.authService.verifyToken(token);
      const { userId, role } = decoded;
      
      const getters: Record<string, ProfileGetter> = {
        user: this.accountManagementService.getUserById.bind(this.accountManagementService),
        helper: this.accountManagementService.getHelperById.bind(this.accountManagementService),
        decider: this.accountManagementService.getDeciderById.bind(this.accountManagementService),
        commercial: this.accountManagementService.getCommercialById.bind(this.accountManagementService),
        maintainer: this.accountManagementService.getMaintainerById.bind(this.accountManagementService),
        admin: this.accountManagementService.getAdminById.bind(this.accountManagementService),
        superAdmin: this.accountManagementService.getSuperAdminById.bind(this.accountManagementService)
      };

      const getter = getters[role];
      if (!getter) {
        throw new Error(`Unsupported role: ${role}`);
      }
      return await getter(userId);
    } catch (error) {
      throw new Error('Failed to verify token and retrieve profile: ' + error);
    }
  }

  async updateProfile(
    token: string,
    updateData: Partial<UserType & HelperType & CommercialType & AdminType & MaintainerType & DeciderType & SuperAdminType>
  ): Promise<UserType | HelperType | CommercialType | AdminType | MaintainerType | DeciderType | SuperAdminType> {
    try {
      const decoded = await this.authService.verifyToken(token);
      const { userId, role } = decoded;

      const updaters: Record<string, ProfileUpdater> = {
        user: this.accountManagementService.updateUser.bind(this.accountManagementService),
        helper: this.accountManagementService.updateHelper.bind(this.accountManagementService),
        decider: this.accountManagementService.updateDecider.bind(this.accountManagementService),
        commercial: this.accountManagementService.updateCommercial.bind(this.accountManagementService),
        maintainer: this.accountManagementService.updateMaintainer.bind(this.accountManagementService),
        admin: this.accountManagementService.updateAdmin.bind(this.accountManagementService),
        superAdmin: this.accountManagementService.updateAdmin.bind(this.accountManagementService)
      };

      const updater = updaters[role];
      if (!updater) {
        throw new Error(`Unsupported role: ${role}`);
      }
      await userActionService.logAction({ userId: Number(userId), action: 'You edited your profile' });
      return await updater(userId, updateData);
    } catch (error) {
      throw new Error('Failed to verify token and update profile: ' + error);
    }
  }

  async deleteProfile(token: string): Promise<{ message: string }> {
    try {
      const decoded = await this.authService.verifyToken(token);
      const { userId, role } = decoded;

      const deleters: Record<string, ProfileDeleter> = {
        user: this.accountManagementService.deleteUser.bind(this.accountManagementService),
        helper: this.accountManagementService.deleteHelper.bind(this.accountManagementService),
        decider: this.accountManagementService.deleteDecider.bind(this.accountManagementService),
        commercial: this.accountManagementService.deleteCommercial.bind(this.accountManagementService),
        maintainer: this.accountManagementService.deleteMaintainer.bind(this.accountManagementService),
        admin: this.accountManagementService.deleteAdmin.bind(this.accountManagementService),
        superAdmin: this.accountManagementService.deleteAdmin.bind(this.accountManagementService)
      };

      const deleter = deleters[role];
      if (!deleter) {
        throw new Error(`Unsupported role: ${role}`);
      }
      return await deleter(userId);
    } catch (error) {
      throw new Error('Failed to verify token and delete profile: ' + error);
    }
  }
}