const ANALYTICS_SERVICE_BASE_URL = process.env.ANALYTICS_SERVICE_BASE_URL
  ? `${process.env.ANALYTICS_SERVICE_BASE_URL}`
  : "http://localhost:3004";

export class ZonesService {
  private static analyticsBaseUrl = ANALYTICS_SERVICE_BASE_URL;

  static async getTopVisitedZones(): Promise<
    { zone_id: number; visit_count: number }[]
  > {
    try {
      const response = await fetch(`${this.analyticsBaseUrl}/zones/top-visited`);
      if (!response.ok) {
        throw new Error(`Error fetching top visited zones: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching top visited zones:", error);
      throw error;
    }
  }

  static async getAverageTimeSpentInZones(): Promise<
    { zone_id: number; avg_time_seconds: number }[]
  > {
    try {
      const response = await fetch(`${this.analyticsBaseUrl}/zones/average-time-spent`);
      if (!response.ok) {
        throw new Error(`Error fetching average time spent in zones: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching average time spent in zones:", error);
      throw error;
    }
  }

  static async getZonesWithHighestObstacleCount(): Promise<
    { zone_id: number; total_obstacles: number }[]
  > {
    try {
      const response = await fetch(`${this.analyticsBaseUrl}/zones/highest-obstacles`);
      if (!response.ok) {
        throw new Error(`Error fetching zones with highest obstacle count: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching zones with highest obstacle count:", error);
      throw error;
    }
  }
}
