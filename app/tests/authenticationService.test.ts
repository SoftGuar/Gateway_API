import { AuthenticationService } from '../../app/services/authentication/authenticationService';

describe('AuthenticationService', () => {
  let authService: AuthenticationService;

  beforeEach(() => {
    authService = new AuthenticationService();

    // Reset and mock the global fetch function before each test.
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('login returns token when successful', async () => {
    // Arrange
    const fakeToken = 'fake-token';
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        data: { token: fakeToken }
      })
    });

    const loginPayload = {
      email: 'test@example.com',
      password: 'password123',
      role: 'user'
    };

    // Act
    const result = await authService.login(loginPayload);

    // Assert
    expect(result).toEqual({ token: fakeToken });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/auth/login'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginPayload)
      })
    );
  });

  test('login throws error when response is not ok', async () => {
    // Arrange
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false
    });

    // Act & Assert
    await expect(
      authService.login({
        email: 'test@example.com',
        password: 'wrongpassword',
        role: 'user'
      })
    ).rejects.toThrow('Login failed');
  });

  test('verifyToken returns userId and role when successful', async () => {
    // Arrange
    const fakeUserId = '12345';
    const fakeRole = 'user';
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        data: { userId: fakeUserId, role: fakeRole }
      })
    });

    const token = 'fake-token';

    // Act
    const result = await authService.verifyToken(token);

    // Assert
    expect(result).toEqual({ userId: fakeUserId, role: fakeRole });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/auth/verify-token'),
      expect.objectContaining({
        method: 'GET',
        headers: { authorization: token }
      })
    );
  });

  test('verifyToken throws error when response is not ok', async () => {
    // Arrange
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false
    });

    // Act & Assert
    await expect(authService.verifyToken('invalid-token')).rejects.toThrow('Token verification failed');
  });
});