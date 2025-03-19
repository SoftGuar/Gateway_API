import { Config } from './app/services.config';
const config = Config.getInstance();
console.log(`User management IP: ${config.getUserManagementIP()}`);
import { AccountManagementService } from './app/services/accountManagementService/accountManagement.service';
import { 
  UserType, 
  UserWithHelpersType, 
  HelperType, 
  DeciderType, 
  CommercialType, 
  MaintainerType, 
  AdminType 
} from './app/services/accountManagementService/types';

const service = new AccountManagementService();

// User Service Tests
async function testCreateUser(): Promise<UserType | undefined> {
  const newUserData = {
    first_name: 'Test',
    last_name: 'User',
    email: `test.user${Date.now()}@example.com`, // Use timestamp to avoid email conflicts
    password: 'test1234',
    phone: '1234567890'
  };

  try {
    const user = await service.createUser(newUserData);
    console.log('testCreateUser:', user);
    return user;
  } catch (error) {
    console.error('testCreateUser Error:', error);
    return undefined;
  }
}

async function testGetUsers() {
  try {
    const users: UserWithHelpersType[] = await service.getUsers();
    console.log('testGetUsers:', users);
    return users;
  } catch (error) {
    console.error('testGetUsers Error:', error);
  }
}

async function testGetUserById(userId: string) {
  try {
    const user: UserWithHelpersType = await service.getUserById(userId);
    console.log('testGetUserById:', user);
    return user;
  } catch (error) {
    console.error('testGetUserById Error:', error);
  }
}

async function testUpdateUser(userId: string) {
  try {
    const updatedUser: UserType = await service.updateUser(userId, {
      first_name: 'Updated'
    });
    console.log('testUpdateUser:', updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('testUpdateUser Error:', error);
  }
}

async function testDeleteUser(userId: string) {
  try {
    const response = await service.deleteUser(userId);
    console.log('testDeleteUser:', response);
    return response;
  } catch (error) {
    console.error('testDeleteUser Error:', error);
  }
}

async function testGetUserHelpers(userId: string) {
  try {
    const Helpers: HelperType[] = await service.getUserHelpers(userId);
    console.log('testGetUserHelpers:', Helpers);
    return Helpers;
  } catch (error) {
    console.error('testGetUserHelpers Error:', error);
  }
}

async function testAddHelperToUser(userId: string, HelperId: string) {
  try {
    const userWithHelpers: UserWithHelpersType = await service.addHelperToUser(userId, HelperId);
    console.log('testAddHelperToUser:', userWithHelpers);
    return userWithHelpers;
  } catch (error) {
    console.error('testAddHelperToUser Error:', error);
  }
}

async function testRemoveHelperFromUser(userId: string, HelperId: string) {
  try {
    const userWithHelpers: UserWithHelpersType = await service.removeHelperFromUser(userId, HelperId);
    console.log('testRemoveHelperFromUser:', userWithHelpers);
    return userWithHelpers;
  } catch (error) {
    console.error('testRemoveHelperFromUser Error:', error);
  }
}

// Helper Service Tests
async function testCreateHelper(): Promise<HelperType | undefined> {
  const newHelperData = {
    first_name: 'Helper',
    last_name: 'Test',
    email: `Helper.test${Date.now()}@example.com`,
    password: 'Helper1234',
    phone: '9876543210'
  };

  try {
    const Helper = await service.createHelper(newHelperData);
    console.log('testCreateHelper:', Helper);
    return Helper;
  } catch (error) {
    console.error('testCreateHelper Error:', error);
    return undefined;
  }
}

async function testGetHelpers() {
  try {
    const Helpers: HelperType[] = await service.getHelpers();
    console.log('testGetHelpers:', Helpers);
    return Helpers;
  } catch (error) {
    console.error('testGetHelpers Error:', error);
  }
}

async function testGetHelperById(HelperId: string) {
  try {
    const Helper: HelperType = await service.getHelperById(HelperId);
    console.log('testGetHelperById:', Helper);
    return Helper;
  } catch (error) {
    console.error('testGetHelperById Error:', error);
  }
}

async function testUpdateHelper(HelperId: string) {
  try {
    const updatedHelper: HelperType = await service.updateHelper(HelperId, {
      first_name: 'Updated Helper'
    });
    console.log('testUpdateHelper:', updatedHelper);
    return updatedHelper;
  } catch (error) {
    console.error('testUpdateHelper Error:', error);
  }
}

async function testDeleteHelper(HelperId: string) {
  try {
    const response = await service.deleteHelper(HelperId);
    console.log('testDeleteHelper:', response);
    return response;
  } catch (error) {
    console.error('testDeleteHelper Error:', error);
  }
}

// Decider Service Tests
async function testCreateDecider(): Promise<DeciderType | undefined> {
  const newDeciderData = {
    first_name: 'Decider',
    last_name: 'Test',
    email: `Decider.test${Date.now()}@example.com`,
    password: 'Decider1234',
    phone: '5556667777'
  };

  try {
    const Decider = await service.createDecider(newDeciderData);
    console.log('testCreateDecider:', Decider);
    return Decider;
  } catch (error) {
    console.error('testCreateDecider Error:', error);
    return undefined;
  }
}

async function testGetDeciders() {
  try {
    const Deciders: DeciderType[] = await service.getDeciders();
    console.log('testGetDeciders:', Deciders);
    return Deciders;
  } catch (error) {
    console.error('testGetDeciders Error:', error);
  }
}

async function testGetDeciderById(DeciderId: string) {
  try {
    const Decider: DeciderType = await service.getDeciderById(DeciderId);
    console.log('testGetDeciderById:', Decider);
    return Decider;
  } catch (error) {
    console.error('testGetDeciderById Error:', error);
  }
}

async function testUpdateDecider(DeciderId: string) {
  try {
    const updatedDecider: DeciderType = await service.updateDecider(DeciderId, {
      first_name: 'Updated Decider'
    });
    console.log('testUpdateDecider:', updatedDecider);
    return updatedDecider;
  } catch (error) {
    console.error('testUpdateDecider Error:', error);
  }
}

async function testDeleteDecider(DeciderId: string) {
  try {
    const response = await service.deleteDecider(DeciderId);
    console.log('testDeleteDecider:', response);
    return response;
  } catch (error) {
    console.error('testDeleteDecider Error:', error);
  }
}

// Commercial Service Tests
async function testCreateCommercial(): Promise<CommercialType | undefined> {
  const newCommercialData = {
    first_name: 'Commercial',
    last_name: 'Test',
    email: `Commercial.test${Date.now()}@example.com`,
    password: 'Commercial1234',
    phone: '1112223333'
  };

  try {
    const Commercial = await service.createCommercial(newCommercialData);
    console.log('testCreateCommercial:', Commercial);
    return Commercial;
  } catch (error) {
    console.error('testCreateCommercial Error:', error);
    return undefined;
  }
}

async function testGetCommercials() {
  try {
    const Commercials: CommercialType[] = await service.getCommercials();
    console.log('testGetCommercials:', Commercials);
    return Commercials;
  } catch (error) {
    console.error('testGetCommercials Error:', error);
  }
}

async function testGetCommercialById(CommercialId: string) {
  try {
    const Commercial: CommercialType = await service.getCommercialById(CommercialId);
    console.log('testGetCommercialById:', Commercial);
    return Commercial;
  } catch (error) {
    console.error('testGetCommercialById Error:', error);
  }
}

async function testUpdateCommercial(CommercialId: string) {
  try {
    const updatedCommercial: CommercialType = await service.updateCommercial(CommercialId, {
      first_name: 'Updated Commercial'
    });
    console.log('testUpdateCommercial:', updatedCommercial);
    return updatedCommercial;
  } catch (error) {
    console.error('testUpdateCommercial Error:', error);
  }
}

async function testDeleteCommercial(CommercialId: string) {
  try {
    const response = await service.deleteCommercial(CommercialId);
    console.log('testDeleteCommercial:', response);
    return response;
  } catch (error) {
    console.error('testDeleteCommercial Error:', error);
  }
}

// Maintainer Service Tests
async function testCreateMaintainer(): Promise<MaintainerType | undefined> {
  const newMaintainerData = {
    first_name: 'Maintainer',
    last_name: 'Test',
    email: `Maintainer.test${Date.now()}@example.com`,
    password: 'Maintainer1234',
    phone: '4445556666'
  };

  try {
    const Maintainer = await service.createMaintainer(newMaintainerData);
    console.log('testCreateMaintainer:', Maintainer);
    return Maintainer;
  } catch (error) {
    console.error('testCreateMaintainer Error:', error);
    return undefined;
  }
}

async function testGetMaintainers() {
  try {
    const Maintainers: MaintainerType[] = await service.getMaintainers();
    console.log('testGetMaintainers:', Maintainers);
    return Maintainers;
  } catch (error) {
    console.error('testGetMaintainers Error:', error);
  }
}

async function testGetMaintainerById(MaintainerId: string) {
  try {
    const Maintainer: MaintainerType = await service.getMaintainerById(MaintainerId);
    console.log('testGetMaintainerById:', Maintainer);
    return Maintainer;
  } catch (error) {
    console.error('testGetMaintainerById Error:', error);
  }
}

async function testUpdateMaintainer(MaintainerId: string) {
  try {
    const updatedMaintainer: MaintainerType = await service.updateMaintainer(MaintainerId, {
      first_name: 'Updated Maintainer'
    });
    console.log('testUpdateMaintainer:', updatedMaintainer);
    return updatedMaintainer;
  } catch (error) {
    console.error('testUpdateMaintainer Error:', error);
  }
}

async function testDeleteMaintainer(MaintainerId: string) {
  try {
    const response = await service.deleteMaintainer(MaintainerId);
    console.log('testDeleteMaintainer:', response);
    return response;
  } catch (error) {
    console.error('testDeleteMaintainer Error:', error);
  }
}

// Admin Service Tests
async function testCreateAdmin(addById: number): Promise<AdminType | undefined> {
  const newAdminData = {
    first_name: 'Admin',
    last_name: 'Test',
    email: `admin.test${Date.now()}@example.com`,
    password: 'admin1234',
    phone: '7778889999',
    privilege: 1,
    add_by: 1
  };

  try {
    const admin = await service.createAdmin(newAdminData);
    console.log('testCreateAdmin:', admin);
    return admin;
  } catch (error) {
    console.error('testCreateAdmin Error:', error);
    return undefined;
  }
}

async function testGetAdmins() {
  try {
    const admins: AdminType[] = await service.getAdmins();
    console.log('testGetAdmins:', admins);
    return admins;
  } catch (error) {
    console.error('testGetAdmins Error:', error);
  }
}

async function testGetAdminById(adminId: string) {
  try {
    const admin: AdminType = await service.getAdminById(adminId);
    console.log('testGetAdminById:', admin);
    return admin;
  } catch (error) {
    console.error('testGetAdminById Error:', error);
  }
}

async function testUpdateAdmin(adminId: string) {
  try {
    const updatedAdmin: AdminType = await service.updateAdmin(adminId, {
      first_name: 'Updated Admin'
    });
    console.log('testUpdateAdmin:', updatedAdmin);
    return updatedAdmin;
  } catch (error) {
    console.error('testUpdateAdmin Error:', error);
  }
}

async function testDeleteAdmin(adminId: string) {
  try {
    const response = await service.deleteAdmin(adminId);
    console.log('testDeleteAdmin:', response);
    return response;
  } catch (error) {
    console.error('testDeleteAdmin Error:', error);
  }
}

async function runTests() {
  console.log("==================== USER TESTS ====================");
  // Create a new user and store its id
  const createdUser = await testCreateUser();
  if (!createdUser) {
    console.error('User creation failed. Aborting further tests.');
    return;
  }
  const userId = createdUser.id.toString();

  // Test retrieving all users
  await testGetUsers();
  
  // Test retrieving the created user using its id
  await testGetUserById(userId);
  
  // Test updating the user
  await testUpdateUser(userId);

  console.log("\n==================== Helper TESTS ====================");
  // Create a Helper for testing Helper-related functionality
  const createdHelper = await testCreateHelper();
  if (!createdHelper) {
    console.error('Helper creation failed. Skipping Helper tests.');
  } else {
    const HelperId = createdHelper.id.toString();
    
    // Test getting all Helpers
    await testGetHelpers();
    
    // Test getting Helper by ID
    await testGetHelperById(HelperId);
    
    // Test updating Helper
    await testUpdateHelper(HelperId);
    
    // Test user-Helper relationship
    await testGetUserHelpers(userId);
    await testAddHelperToUser(userId, HelperId);
    await testRemoveHelperFromUser(userId, HelperId);
    
    // Delete Helper at the end
    await testDeleteHelper(HelperId);
  }
  
  console.log("\n==================== Decider TESTS ====================");
  // Create and test Decider
  const createdDecider = await testCreateDecider();
  if (!createdDecider) {
    console.error('Decider creation failed. Skipping Decider tests.');
  } else {
    const DeciderId = createdDecider.id.toString();
    
    await testGetDeciders();
    await testGetDeciderById(DeciderId);
    await testUpdateDecider(DeciderId);
    await testDeleteDecider(DeciderId);
  }
  
  console.log("\n==================== Commercial TESTS ====================");
  // Create and test Commercial
  const createdCommercial = await testCreateCommercial();
  if (!createdCommercial) {
    console.error('Commercial creation failed. Skipping Commercial tests.');
  } else {
    const CommercialId = createdCommercial.id.toString();
    
    await testGetCommercials();
    await testGetCommercialById(CommercialId);
    await testUpdateCommercial(CommercialId);
    await testDeleteCommercial(CommercialId);
  }
  
  console.log("\n==================== Maintainer TESTS ====================");
  // Create and test Maintainer
  const createdMaintainer = await testCreateMaintainer();
  if (!createdMaintainer) {
    console.error('Maintainer creation failed. Skipping Maintainer tests.');
  } else {
    const MaintainerId = createdMaintainer.id.toString();
    
    await testGetMaintainers();
    await testGetMaintainerById(MaintainerId);
    await testUpdateMaintainer(MaintainerId);
    await testDeleteMaintainer(MaintainerId);
  }
  
  console.log("\n==================== ADMIN TESTS ====================");
  // Create and test admin (using user ID as add_by)
  const createdAdmin = await testCreateAdmin(parseInt(userId));
  if (!createdAdmin) {
    console.error('Admin creation failed. Skipping admin tests.');
  } else {
    const adminId = createdAdmin.id.toString();
    
    await testGetAdmins();
    await testGetAdminById(adminId);
    await testUpdateAdmin(adminId);
    await testDeleteAdmin(adminId);
  }
  
  console.log("\n==================== CLEANUP ====================");
  // Finally, test deleting the user
  await testDeleteUser(userId);
}

runTests().catch(error => {
  console.error('Error running tests:', error);
});