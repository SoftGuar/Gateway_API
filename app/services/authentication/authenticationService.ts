import { Config } from '../../services.config';

interface LoginInput {
  email: string;
  password: string;
  role: string;
}

interface LoginResponse {
  token: string;
}

interface VerifyTokenResponse {
  userId: string;
  role: string;
}

export class AuthenticationService {
  private baseUrl: string;

  constructor() {
    // Using the authentication service IP from the configuration.
    this.baseUrl = Config.getInstance().getAuthenticationIP();
  }

  // POST /login
  async login({ email, password, role }: LoginInput): Promise<LoginResponse> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role })
    });
    if (!response.ok) {
      throw new Error('Login failed');
    }
    const payload = await response.json();
    return payload.data;
  }

  // GET /verify
  async verifyToken(token: string): Promise<VerifyTokenResponse> {
    const response = await fetch(`${this.baseUrl}/auth/verify-token`, {
      method: 'GET',
      headers: { authorization: token }
    });
    if (!response.ok) {
      throw new Error('Token verification failed');
    }
    const payload = await response.json();
    return payload.data;
  }
}