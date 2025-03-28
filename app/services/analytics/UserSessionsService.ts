const ANALYTICS_SERVICE_BASE_URL = process.env.ANALYTICS_SERVICE_BASE_URL
  ? `${process.env.ANALYTICS_SERVICE_BASE_URL}`
  : "http://localhost:3004";

export class UserSessionsService {
  private static analyticsBaseUrl = ANALYTICS_SERVICE_BASE_URL;

  static async getTopUsers() {
    try {
      const response = await fetch(`${this.analyticsBaseUrl}/users/top`);
      if (!response.ok) {
        throw new Error(`Error fetching top users: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching top users:", error);
      throw error;
    }
  }

  static async getUserRatings() {
    try {
      const response = await fetch(`${this.analyticsBaseUrl}/users/ratings`);
      if (!response.ok) {
        throw new Error(`Error fetching user ratings: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching user ratings:", error);
      throw error;
    }
  }

  static async getUserFeedback() {
    try {
      const response = await fetch(`${this.analyticsBaseUrl}/users/feedback`);
      if (!response.ok) {
        throw new Error(`Error fetching user feedback: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching user feedback:", error);
      throw error;
    }
  }

  static async getUserSessionDuration() {
    try {
      const response = await fetch(`${this.analyticsBaseUrl}/users/session-durations`);
      if (!response.ok) {
        throw new Error(`Error fetching user session durations: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching user session durations:", error);
      throw error;
    }
  }

  static async getDAUs() {
    try {
      const response = await fetch(`${this.analyticsBaseUrl}/users/daily-active`);
      if (!response.ok) {
        throw new Error(`Error fetching DAUs: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching DAUs:", error);
      throw error;
    }
  }

  static async getWAUs() {
    try {
      const response = await fetch(`${this.analyticsBaseUrl}/users/weekly-active`);
      if (!response.ok) {
        throw new Error(`Error fetching WAUs: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching WAUs:", error);
      throw error;
    }
  }

  static async getMAUs() {
    try {
      const response = await fetch(`${this.analyticsBaseUrl}/users/monthly-active`);
      if (!response.ok) {
        throw new Error(`Error fetching MAUs: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching MAUs:", error);
      throw error;
    }
  }
}
