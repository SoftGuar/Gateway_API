import { Config } from './app/services.config'

const config = Config.getInstance()

console.log(`User management IP: ${config.getUserManagementIP()}`)
import { AccountManagementService } from './app/services/accountManagement.service';
import { UserType, UserWithHelpersType, HelperType } from './app/services/accountManagement.service';
const service = new AccountManagementService();

async function testCreateUser(): Promise<UserType | undefined> {
    const newUserData = {
      first_name: 'Test',
      last_name: 'User',
      email: 'test.user23@example.com',
      password: 'test1234',
      phone: '1234567890'
    };
  
    try {
      const user = await service.createUser(newUserData);
      console.log('testCreateUser:', user);
      return user;
    } catch (error) {
      console.error('testCreateUser Error:', error);
    }
  }
  
  async function testGetUsers() {
    try {
      const users: UserWithHelpersType[] = await service.getUsers();
      console.log('testGetUsers:', users);
    } catch (error) {
      console.error('testGetUsers Error:', error);
    }
  }
  
  async function testGetUserById(userId: string) {
    try {
      const user: UserWithHelpersType = await service.getUserById(userId);
      console.log('testGetUserById:', user);
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
    } catch (error) {
      console.error('testUpdateUser Error:', error);
    }
  }
  
  async function testDeleteUser(userId: string) {
    try {
      const response = await service.deleteUser(userId);
      console.log('testDeleteUser:', response);
    } catch (error) {
      console.error('testDeleteUser Error:', error);
    }
  }
  
  async function testGetUserHelpers(userId: string) {
    try {
      const helpers: HelperType[] = await service.getUserHelpers(userId);
      console.log('testGetUserHelpers:', helpers);
    } catch (error) {
      console.error('testGetUserHelpers Error:', error);
    }
  }
  
  async function testAddHelperToUser(userId: string, helperId: string) {
    try {
      const userWithHelpers: UserWithHelpersType = await service.addHelperToUser(userId, helperId);
      console.log('testAddHelperToUser:', userWithHelpers);
    } catch (error) {
      console.error('testAddHelperToUser Error:', error);
    }
  }
  
  async function testRemoveHelperFromUser(userId: string, helperId: string) {
    try {
      const userWithHelpers: UserWithHelpersType = await service.removeHelperFromUser(userId, helperId);
      console.log('testRemoveHelperFromUser:', userWithHelpers);
    } catch (error) {
      console.error('testRemoveHelperFromUser Error:', error);
    }
  }
  
  async function runTests() {
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
    
    // Test retrieving helpers (if any)
    await testGetUserHelpers(userId);
    
    // For testing add/remove helper methods, assume a helperId "1"
    const helperId = '1';
    await testAddHelperToUser(userId, helperId);
    await testRemoveHelperFromUser(userId, helperId);
    
    // Finally, test deleting the user
    await testDeleteUser(userId);
  }
  
  runTests().catch(error => {
    console.error('Error running tests:', error);
  });