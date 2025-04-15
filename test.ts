import { AuthenticationService } from './app/services/authentication/authenticationService';
import { AccountService } from './app/services/account/account.service';

async function testLoginAndVerifyToken() {
  const authService = new AuthenticationService();

  // Define login payload based on the login schema
  const loginPayload = {
    email: "wassim@gmail.com",
    password: "password1234",
    role: "user"
  };

  try {
    // Login and retrieve token
    const loginResponse = await authService.login(loginPayload);
    console.log("Login successful:", loginResponse.token);

    const accountService = new AccountService();
    const profile = await accountService.getProfile(loginResponse.token);
    console.log("Profile retrieved:", profile);

    // Test updating profile
    await testUpdateProfile(loginResponse.token);

    // Test deleting profile
    // await testDeleteProfile(loginResponse.token);
  } catch (error) {
    console.error("Authentication test failed:", error);
  }
}

async function testUpdateProfile(token: string) {
  const accountService = new AccountService();
  try {
    // Define the update data - adjust fields as needed
    const updateData = {
      first_name: "Wassim Name"
    };
    const updatedProfile = await accountService.updateProfile(token, updateData);
    console.log("Profile updated:", updatedProfile);
  } catch (error) {
    console.error("Profile update failed:", error);
  }
}

async function testDeleteProfile(token: string) {
  const accountService = new AccountService();
  try {
    const deleteResponse = await accountService.deleteProfile(token);
    console.log("Profile deleted:", deleteResponse.message);
  } catch (error) {
    console.error("Profile deletion failed:", error);
  }
}

// Test the account creation

import { AccountManagementService } from './app/services/accountManagementService/accountManagement.service';
import { UserType } from './app/services/accountManagementService/types';

async function testAccountCreation(): Promise<UserType | undefined> {
  const accountService = new AccountManagementService();
  
  // Define the new user data (adjust as necessary)
  const newUserData = {
    first_name: 'Test',
    last_name: 'User',
    email: `test.usersuperadmin@example.com`, // unique email with timestamp
    password: 'testPassword123',
    phone: '1234567890'
  };

  try {
    const createdAccount = await accountService.createUser(newUserData);
    console.log("Account creation successful:", createdAccount);
    return createdAccount;
  } catch (error) {
    console.error("Account creation failed:", error);
    return undefined;
  }
}

testAccountCreation();