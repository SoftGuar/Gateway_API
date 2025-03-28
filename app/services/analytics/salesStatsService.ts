export class SalesStatsService {
  private static analyticsBaseUrl = process.env.ANALYTICS_SERVICE_BASE_URL || "http://localhost:3004";

  async getCRR() {
    try {
      const response = await fetch(`${SalesStatsService.analyticsBaseUrl}/sales-stats/crr`);
      if (!response.ok) {
        throw new Error(`Error fetching CRR: ${response.statusText}`);
      }
      const crr = await response.json();
      return crr;
    } catch (error) {
      console.error("Error fetching Customer Retention Rate:", error);
      throw error;
    }
  }

  async getCustomerRetentionDetails() {
    try {
      const response = await fetch(`${SalesStatsService.analyticsBaseUrl}/sales-stats/crr/details`);
      if (!response.ok) {
        throw new Error(`Error fetching customer retention details: ${response.statusText}`);
      }
      const details = await response.json();
      return details;
    } catch (error) {
      console.error("Error fetching customer retention details:", error);
      throw error;
    }
  }
}
