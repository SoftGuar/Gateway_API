import { Config } from '../services.config';
import { AccountManagementService } from '../services/accountManagementService/accountManagement.service';
import { 
  UserType, 
  UserWithHelpersType, 
  HelperType, 
  DeciderType, 
  CommercialType, 
  MaintainerType, 
  AdminType 
} from '../services/accountManagementService/types';


describe('AccountManagementService', () => {
  let service: AccountManagementService;
  let userId: string;
  let helperId: string;
  let deciderId: string;
  let commercialId: string;
  let maintainerId: string;
  let adminId: string;
  
  // Set unique email for each test run
  const timestamp = Date.now();
  const testUserEmail = `test.user${timestamp}@example.com`;
  const testHelperEmail = `helper.test${timestamp}@example.com`;
  const testDeciderEmail = `decider.test${timestamp}@example.com`;
  const testCommercialEmail = `commercial.test${timestamp}@example.com`;
  const testMaintainerEmail = `maintainer.test${timestamp}@example.com`;
  const testAdminEmail = `admin.test${timestamp}@example.com`;

  beforeAll(() => {
    service = new AccountManagementService();
  });

  // Clean up any test data that wasn't properly removed
  afterAll(async () => {
    try {
      if (userId) await service.deleteUser(userId);
      if (helperId) await service.deleteHelper(helperId);
      if (deciderId) await service.deleteDecider(deciderId);
      if (commercialId) await service.deleteCommercial(commercialId);
      if (maintainerId) await service.deleteMaintainer(maintainerId);
      if (adminId) await service.deleteAdmin(adminId);
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  describe('User Management', () => {
    test('should create a new user', async () => {
      const newUserData = {
        first_name: 'Test',
        last_name: 'User',
        email: testUserEmail,
        password: 'test1234',
        phone: '1234567890'
      };

      const user = await service.createUser(newUserData);
      userId = user.id.toString();

      console.log('User:', user);

      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.first_name).toBe(newUserData.first_name);
      expect(user.last_name).toBe(newUserData.last_name);
      expect(user.email).toBe(newUserData.email);
      expect(user.phone).toBe(newUserData.phone);
      // Password should not be returned
      expect(user.password).toBeUndefined();
    });

    test('should get all users', async () => {
      const users = await service.getUsers();

      console.log('Users:', users);
      
      expect(users).toBeDefined();
      expect(Array.isArray(users)).toBe(true);
      expect(users.some(user => user.id.toString() === userId)).toBe(true);
    });

    test('should get user by id', async () => {
      const user = await service.getUserById(userId);

      console.log('User:', user);
      
      expect(user).toBeDefined();
      expect(user.id.toString()).toBe(userId);
      expect(user.email).toBe(testUserEmail);
      expect(Array.isArray(user.helpers)).toBe(true);
    });

    test('should update user', async () => {
      const updatedData = {
        first_name: 'Updated'
      };
      
      const updatedUser = await service.updateUser(userId, updatedData);

      console.log('Updated User:', updatedUser);
      
      expect(updatedUser).toBeDefined();
      expect(updatedUser.id.toString()).toBe(userId);
      expect(updatedUser.first_name).toBe('Updated');
      // Other fields should remain unchanged
      expect(updatedUser.email).toBe(testUserEmail);
    });
  });

  describe('Helper Management', () => {
    test('should create a new helper', async () => {
      const newHelperData = {
        first_name: 'Helper',
        last_name: 'Test',
        email: testHelperEmail,
        password: 'helper1234',
        phone: '9876543210'
      };
      
      const helper = await service.createHelper(newHelperData);

        console.log('Helper:', helper);
      helperId = helper.id.toString();
      
      expect(helper).toBeDefined();
      expect(helper.id).toBeDefined();
      expect(helper.first_name).toBe(newHelperData.first_name);
      expect(helper.email).toBe(newHelperData.email);
    });
    
    test('should get all helpers', async () => {
      const helpers = await service.getHelpers();

        console.log('Helpers:', helpers);
      
      expect(helpers).toBeDefined();
      expect(Array.isArray(helpers)).toBe(true);
      expect(helpers.some(helper => helper.id.toString() === helperId)).toBe(true);
    });
    
    test('should get helper by id', async () => {
      const helper = await service.getHelperById(helperId);

        console.log('Helper:', helper);
      
      expect(helper).toBeDefined();
      expect(helper.id.toString()).toBe(helperId);
      expect(helper.email).toBe(testHelperEmail);
    });
    
    test('should update helper', async () => {
      const updatedData = {
        first_name: 'Updated Helper'
      };
      
      const updatedHelper = await service.updateHelper(helperId, updatedData);

        console.log('Updated Helper:', updatedHelper);
      
      expect(updatedHelper).toBeDefined();
      expect(updatedHelper.id.toString()).toBe(helperId);
      expect(updatedHelper.first_name).toBe('Updated Helper');
    });
  });
  
  describe('User-Helper Relationship', () => {
    test('should get user helpers (initially empty)', async () => {
      const helpers = await service.getUserHelpers(userId);

      console.log('User Helpers:', helpers);
      
      expect(helpers).toBeDefined();
      expect(Array.isArray(helpers)).toBe(true);
      expect(helpers.length).toBe(0);
    });
    
    test('should add helper to user', async () => {
      const userWithHelpers = await service.addHelperToUser(userId, helperId);

        console.log('User with Helpers:', userWithHelpers);
      
      expect(userWithHelpers).toBeDefined();
      expect(userWithHelpers.helpers).toBeDefined();
      expect(Array.isArray(userWithHelpers.helpers)).toBe(true);
      if (!userWithHelpers.helpers) fail('Helpers should not be null');
      expect(userWithHelpers.helpers.length).toBe(1);
      expect(userWithHelpers.helpers[0].id.toString()).toBe(helperId);
    });
    
    test('should get user helpers (now with one helper)', async () => {
      const helpers = await service.getUserHelpers(userId);

        console.log('User Helpers:', helpers);
      
      expect(helpers).toBeDefined();
      expect(Array.isArray(helpers)).toBe(true);
      expect(helpers.length).toBe(1);
      expect(helpers[0].id.toString()).toBe(helperId);
    });
    
    test('should remove helper from user', async () => {
      const userWithHelpers = await service.removeHelperFromUser(userId, helperId);

        console.log('User with Helpers:', userWithHelpers);
      
      expect(userWithHelpers).toBeDefined();
      expect(userWithHelpers.helpers).toBeDefined();
      expect(Array.isArray(userWithHelpers.helpers)).toBe(true);
      if (!userWithHelpers.helpers) fail('Helpers should not be null');
      expect(userWithHelpers.helpers.length).toBe(0);
    });
  });

  describe('Decider Management', () => {
    test('should create a new decider', async () => {
      const newDeciderData = {
        first_name: 'Decider',
        last_name: 'Test',
        email: testDeciderEmail,
        password: 'decider1234',
        phone: '5556667777'
      };
      
      const decider = await service.createDecider(newDeciderData);

        console.log('Decider:', decider);
      deciderId = decider.id.toString();
      
      expect(decider).toBeDefined();
      expect(decider.id).toBeDefined();
      expect(decider.first_name).toBe(newDeciderData.first_name);
      expect(decider.email).toBe(newDeciderData.email);
    });
    
    test('should get all deciders', async () => {
      const deciders = await service.getDeciders();

        console.log('Deciders:', deciders);
      
      expect(deciders).toBeDefined();
      expect(Array.isArray(deciders)).toBe(true);
      expect(deciders.some(decider => decider.id.toString() === deciderId)).toBe(true);
    });
    
    test('should get decider by id', async () => {
      const decider = await service.getDeciderById(deciderId);

        console.log('Decider:', decider);
      
      expect(decider).toBeDefined();
      expect(decider.id.toString()).toBe(deciderId);
      expect(decider.email).toBe(testDeciderEmail);
    });
    
    test('should update decider', async () => {
      const updatedData = {
        first_name: 'Updated Decider'
      };
      
      const updatedDecider = await service.updateDecider(deciderId, updatedData);

        console.log('Updated Decider:', updatedDecider);
      
      expect(updatedDecider).toBeDefined();
      expect(updatedDecider.id.toString()).toBe(deciderId);
      expect(updatedDecider.first_name).toBe('Updated Decider');
    });
  });

  describe('Commercial Management', () => {
    test('should create a new commercial', async () => {
      const newCommercialData = {
        first_name: 'Commercial',
        last_name: 'Test',
        email: testCommercialEmail,
        password: 'commercial1234',
        phone: '1112223333'
      };
      
      const commercial = await service.createCommercial(newCommercialData);

        console.log('Commercial:', commercial);
      commercialId = commercial.id.toString();
      
      expect(commercial).toBeDefined();
      expect(commercial.id).toBeDefined();
      expect(commercial.first_name).toBe(newCommercialData.first_name);
      expect(commercial.email).toBe(newCommercialData.email);
    });
    
    test('should get all commercials', async () => {
      const commercials = await service.getCommercials();

        console.log('Commercials:', commercials);
      
      expect(commercials).toBeDefined();
      expect(Array.isArray(commercials)).toBe(true);
      expect(commercials.some(commercial => commercial.id.toString() === commercialId)).toBe(true);
    });
    
    test('should get commercial by id', async () => {
      const commercial = await service.getCommercialById(commercialId);

        console.log('Commercial:', commercial);
      
      expect(commercial).toBeDefined();
      expect(commercial.id.toString()).toBe(commercialId);
      expect(commercial.email).toBe(testCommercialEmail);
    });
    
    test('should update commercial', async () => {
      const updatedData = {
        first_name: 'Updated Commercial'
      };
      
      const updatedCommercial = await service.updateCommercial(commercialId, updatedData);

        console.log('Updated Commercial:', updatedCommercial);
      
      expect(updatedCommercial).toBeDefined();
      expect(updatedCommercial.id.toString()).toBe(commercialId);
      expect(updatedCommercial.first_name).toBe('Updated Commercial');
    });
  });

  describe('Maintainer Management', () => {
    test('should create a new maintainer', async () => {
      const newMaintainerData = {
        first_name: 'Maintainer',
        last_name: 'Test',
        email: testMaintainerEmail,
        password: 'maintainer1234',
        phone: '4445556666'
      };
      
      const maintainer = await service.createMaintainer(newMaintainerData);

      console.log('Maintainer:', maintainer);
      maintainerId = maintainer.id.toString();
      
      expect(maintainer).toBeDefined();
      expect(maintainer.id).toBeDefined();
      expect(maintainer.first_name).toBe(newMaintainerData.first_name);
      expect(maintainer.email).toBe(newMaintainerData.email);
    });
    
    test('should get all maintainers', async () => {
      const maintainers = await service.getMaintainers();

        console.log('Maintainers:', maintainers);
      
      expect(maintainers).toBeDefined();
      expect(Array.isArray(maintainers)).toBe(true);
      expect(maintainers.some(maintainer => maintainer.id.toString() === maintainerId)).toBe(true);
    });
    
    test('should get maintainer by id', async () => {
      const maintainer = await service.getMaintainerById(maintainerId);

        console.log('Maintainer:', maintainer);
      
      expect(maintainer).toBeDefined();
      expect(maintainer.id.toString()).toBe(maintainerId);
      expect(maintainer.email).toBe(testMaintainerEmail);
    });
    
    test('should update maintainer', async () => {
      const updatedData = {
        first_name: 'Updated Maintainer'
      };
      
      const updatedMaintainer = await service.updateMaintainer(maintainerId, updatedData);

        console.log('Updated Maintainer:', updatedMaintainer);
      
      expect(updatedMaintainer).toBeDefined();
      expect(updatedMaintainer.id.toString()).toBe(maintainerId);
      expect(updatedMaintainer.first_name).toBe('Updated Maintainer');
    });
  });

  describe('Admin Management', () => {
    test('should create a new admin', async () => {
      const newAdminData = {
        first_name: 'Admin',
        last_name: 'Test',
        email: testAdminEmail,
        password: 'admin1234',
        phone: '7778889999',
        privilege: 1,
        add_by: 1
      };
      
      const admin = await service.createAdmin(newAdminData);

        console.log('Admin:', admin);

      adminId = admin.id.toString();
      
      expect(admin).toBeDefined();
      expect(admin.id).toBeDefined();
      expect(admin.first_name).toBe(newAdminData.first_name);
      expect(admin.email).toBe(newAdminData.email);

      expect(admin.privilege).toBe(newAdminData.privilege);
      expect(admin.add_by).toBe(newAdminData.add_by);
    });
    
    test('should get all admins', async () => {
      const admins = await service.getAdmins();

        console.log('Admins:', admins);
      
      expect(admins).toBeDefined();
      expect(Array.isArray(admins)).toBe(true);
      expect(admins.some(admin => admin.id.toString() === adminId)).toBe(true);
    });
    
    test('should get admin by id', async () => {
      const admin = await service.getAdminById(adminId);

        console.log('Admin:', admin);
      
      expect(admin).toBeDefined();
      expect(admin.id.toString()).toBe(adminId);
      expect(admin.email).toBe(testAdminEmail);
    });
    
    test('should update admin', async () => {
      const updatedData = {
        first_name: 'Updated Admin'
      };
      
      const updatedAdmin = await service.updateAdmin(adminId, updatedData);
      
      expect(updatedAdmin).toBeDefined();
      expect(updatedAdmin.id.toString()).toBe(adminId);
      expect(updatedAdmin.first_name).toBe('Updated Admin');
    });
  });

  describe('Delete operations', () => {
    test('should delete helper', async () => {
      const response = await service.deleteHelper(helperId);

      console.log('Delete Helper:', response);
      
      expect(response).toBeDefined();
      if (!response) fail('Response should not be null');
      expect(response.message).toBe('Helper deleted successfully');
      
      // Verify helper is deleted
      try {
        await service.getHelperById(helperId);
        fail('Helper should not exist');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
    
    test('should delete decider', async () => {
      const response = await service.deleteDecider(deciderId);

        console.log('Delete Decider:', response);
      
      expect(response).toBeDefined();
      expect(response.message).toBe('Decider deleted successfully');
    });
    
    test('should delete commercial', async () => {
      const response = await service.deleteCommercial(commercialId);
      

        console.log('Delete Commercial:', response);


      expect(response).toBeDefined();
      expect(response.message).toBe('Commercial deleted successfully');
    });
    
    test('should delete maintainer', async () => {
      const response = await service.deleteMaintainer(maintainerId);

        console.log('Delete Maintainer:', response);
      
      expect(response).toBeDefined();
      expect(response.message).toBe('Maintainer deleted successfully');
    });
    
    test('should delete admin', async () => {
      const response = await service.deleteAdmin(adminId);

        console.log('Delete Admin:', response);
      
      expect(response).toBeDefined();
      expect(response.message).toBe('Admin deleted successfully');
    });
    
    test('should delete user', async () => {
      const response = await service.deleteUser(userId);

        console.log('Delete User:', response);
      
      expect(response).toBeDefined();
      expect(response.message).toBe('User deleted successfully');
    });
  });
});