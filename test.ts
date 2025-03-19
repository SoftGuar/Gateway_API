import { AuthenticationService } from './app/services/authentication/authenticationService';

async function testLoginAndVerifyToken() {
  const authService = new AuthenticationService();

  // Define login payload based on the login schema
  const loginPayload = {
    email: "wassim@gmail.com",
    password: "password",
    role: "user"
  };

  try {
    // Login and retrieve token
    const loginResponse = await authService.login(loginPayload);
    console.log("Login successful:", loginResponse.token);

    // Verify the received token
    const verifyResponse = await authService.verifyToken(loginResponse.token);
    console.log("Token verification successful:", verifyResponse);
  } catch (error) {
    console.error("Authentication test failed:", error);
  }
}

testLoginAndVerifyToken();