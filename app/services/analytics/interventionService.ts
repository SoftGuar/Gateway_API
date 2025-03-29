const ANALYTICS_SERVICE_BASE_URL = process.env.ANALYTICS_SERVICE_BASE_URL
  ? `${process.env.ANALYTICS_SERVICE_BASE_URL}`
  : "http://localhost:3004";

export class InterventionService {
  static async getInterventionAverageDuration() {
    try {
      const response = await fetch(`${ANALYTICS_SERVICE_BASE_URL}/interventions/average-duration`, {
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
      console.error("Error fetching intervention average duration:", error);
      throw new Error(`Failed to fetch intervention average duration: ${error.message}`);
    }
  }

  static async getMonthlyAverageDuration() {
    try {
      const response = await fetch(`${ANALYTICS_SERVICE_BASE_URL}/interventions/monthly-average-duration`, {
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
      console.error("Error fetching monthly average duration:", error);
      throw new Error(`Failed to fetch monthly average duration: ${error.message}`);
    }
  }

  static async getMaintainerInterventionCount() {
    try {
      const response = await fetch(`${ANALYTICS_SERVICE_BASE_URL}/interventions/maintainer-count`, {
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
      console.error("Error fetching maintainer intervention count:", error);
      throw new Error(`Failed to fetch maintainer intervention count: ${error.message}`);
    }
  }

  static async getAverageAnswerTime() {
    try {
      const response = await fetch(`${ANALYTICS_SERVICE_BASE_URL}/interventions/average-answer-time`, {
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
      console.error("Error fetching average answer time:", error);
      throw new Error(`Failed to fetch average answer time: ${error.message}`);
    }
  }
}
