import dotenv from 'dotenv';
dotenv.config();

export class Config {
    private static instance: Config;
    
    private userManagementIP: string;
    private authenticationIP: string;
    private adminServiceIP: string;

    
    private constructor() {
      // Load IP addresses from environment variables or fallback to defaults.
      this.userManagementIP = process.env.USER_MANAGEMENT_IP || 'http://127.0.0.1:4000';
      this.authenticationIP = process.env.AUTHENTICATION_IP || 'http://127.0.0.1:5000';
      this.adminServiceIP=process.env.adminService_IP || 'http://127.0.0.1:8000';
    }
    
    public static getInstance(): Config {
      if (!Config.instance) {
        Config.instance = new Config();
      }
      return Config.instance;
    }
    
    /**
     * Get the IP address for the user management service.
     */
    public getUserManagementIP(): string {
      return this.userManagementIP;
    }
    
    /**
     * Get the IP address for the authentication service.
     */
    public getAuthenticationIP(): string {
      return this.authenticationIP;
    }
      /**
     * Get the IP address for the admine service.
     */
    public getadminServiceIP(): string {
      return this.adminServiceIP;
    }

    
    public getPort(): number {
      return Number(process.env.PORT) || 3000;
    }
    
    public getHost(): string {
      return process.env.HOST || '0.0.0.0';
    }
  }
  