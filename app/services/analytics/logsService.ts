const ANALYTICS_SERVICE_BASE_URL = process.env.ANALYTICS_SERVICE_BASE_URL
  ? `${process.env.ANALYTICS_SERVICE_BASE_URL}`
  : "http://localhost:3004";

export class LogsService {
  private static analyticsBaseUrl = ANALYTICS_SERVICE_BASE_URL;

  static async getLogs() {
    try {
      const response = await fetch(`${this.analyticsBaseUrl}/logs`);
      if (!response.ok) {
        throw new Error(`Error fetching logs: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching logs:", error);
      throw error;
    }
  }
}
