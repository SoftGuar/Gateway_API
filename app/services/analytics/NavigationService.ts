const ANALYTICS_SERVICE_BASE_URL = process.env.ANALYTICS_SERVICE_BASE_URL
  ? `${process.env.ANALYTICS_SERVICE_BASE_URL}`
  : "http://localhost:3004";

export class NavigationService {
  private static analyticsBaseUrl = ANALYTICS_SERVICE_BASE_URL;

  static async getAllNavigationLogs() {
    try {
      const response = await fetch(`${this.analyticsBaseUrl}/navigation/logs`);
      if (!response.ok) {
        throw new Error(`Error fetching navigation logs: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching navigation logs:", error);
      throw error;
    }
  }

  static async getMostReroutingRequests() {
    try {
      const response = await fetch(`${this.analyticsBaseUrl}/navigation/most-rerouting-requests`);
      if (!response.ok) {
        throw new Error(`Error fetching most rerouting requests: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching most rerouting requests:", error);
      throw error;
    }
  }

  static async getSuccessfulNavigations() {
    try {
      const response = await fetch(`${this.analyticsBaseUrl}/navigation/successful`);
      if (!response.ok) {
        throw new Error(`Error fetching successful navigations: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching successful navigations:", error);
      throw error;
    }
  }
}
