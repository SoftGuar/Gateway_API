const ANALYTICS_SERVICE_BASE_URL = process.env.ANALYTICS_SERVICE_BASE_URL
  ? `${process.env.ANALYTICS_SERVICE_BASE_URL}`
  : "http://localhost:3004";

export class POIsService {
  static async getTopVisitedPOIs() {
    try {
      const response = await fetch(`${ANALYTICS_SERVICE_BASE_URL}/pois/top-visited`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Analytics service error: ${errorData.message || "Unknown error"}`);
      }

      const result = await response.json();
      return result;
    } catch (error: any) {
      console.error("Error fetching top visited POIs:", error);
      throw new Error(`Failed to fetch top visited POIs: ${error.message}`);
    }
  }
}
