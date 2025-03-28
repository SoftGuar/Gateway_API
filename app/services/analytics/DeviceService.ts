const ANALYTICS_SERVICE_BASE_URL = process.env.ANALYTICS_SERVICE_BASE_URL
  ? `${process.env.ANALYTICS_SERVICE_BASE_URL}`
  : "http://localhost:3004";

export class DeviceService {
  static async getDeviceStatus() {
    try {
      const response = await fetch(`${ANALYTICS_SERVICE_BASE_URL}/device/status`, {
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
      console.error("Error fetching device status:", error);
      throw new Error(`Failed to fetch device status: ${error.message}`);
    }
  }

  static async getDeviceIssuesOverTime() {
    try {
      const response = await fetch(`${ANALYTICS_SERVICE_BASE_URL}/device/issues`, {
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
      console.error("Error fetching device issues over time:", error);
      throw new Error(`Failed to fetch device issues over time: ${error.message}`);
    }
  }

  static async getDeviceIssues() {
    try {
      const response = await fetch(`${ANALYTICS_SERVICE_BASE_URL}/device/issues/list`, {
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
      console.error("Error fetching device issues:", error);
      throw new Error(`Failed to fetch device issues: ${error.message}`);
    }
  }

  static async getDevicePerformance() {
    try {
      const response = await fetch(`${ANALYTICS_SERVICE_BASE_URL}/device/performance`, {
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
      console.error("Error fetching device performance:", error);
      throw new Error(`Failed to fetch device performance: ${error.message}`);
    }
  }

  static async devicesSold() {
    try {
      const response = await fetch(`${ANALYTICS_SERVICE_BASE_URL}/device/sold`, {
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
      console.error("Error fetching devices sold:", error);
      throw new Error(`Failed to fetch devices sold: ${error.message}`);
    }
  }

  static async deviceRevenue() {
    try {
      const response = await fetch(`${ANALYTICS_SERVICE_BASE_URL}/device/revenue`, {
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
      console.error("Error fetching device revenue:", error);
      throw new Error(`Failed to fetch device revenue: ${error.message}`);
    }
  }

  static async getMostPopularDevices() {
    try {
      const response = await fetch(`${ANALYTICS_SERVICE_BASE_URL}/device/popular`, {
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
      console.error("Error fetching most popular devices:", error);
      throw new Error(`Failed to fetch most popular devices: ${error.message}`);
    }
  }

  static async getDeviceIntervention() {
    try {
      const response = await fetch(`${ANALYTICS_SERVICE_BASE_URL}/device/interventions`, { 
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
      console.error("Error fetching device interventions:", error);
      throw new Error(`Failed to fetch device interventions: ${error.message}`);
    }
  }
}
