const SALES_SERVICE_BASE_URL = process.env.SALES_SERVICE_BASE_URL
  ? `${process.env.SALES_SERVICE_BASE_URL}`
  : "http://localhost:3003";

export const TransactionService = {
  fetchSales: async () => {
    try {
      const response = await fetch(`${SALES_SERVICE_BASE_URL}/transactions/sales`);
      if (!response.ok) {
        throw new Error(`Error fetching sales: ${response.statusText}`);
      }
      return await response.json();
    } catch (error: any) {
      console.error("Error fetching sales:", error);
      throw error;
    }
  },
  createTransaction: async (data: any) => {
    try {
      const response = await fetch(`${SALES_SERVICE_BASE_URL}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error creating transaction: ${response.statusText}`);
      }
      return await response.json();
    } catch (error: any) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  },

  getTransactions: async () => {
    try {
      const response = await fetch(`${SALES_SERVICE_BASE_URL}/transactions`);
      if (!response.ok) {
        throw new Error(`Error getting transactions: ${response.statusText}`);
      }
      return await response.json();
    } catch (error: any) {
      console.error("Error getting transactions:", error);
      throw error;
    }
  },

  getTransactionById: async (id: number) => {
    try {
      const response = await fetch(
        `${SALES_SERVICE_BASE_URL}/transactions/${id}`
      );
      if (!response.ok) {
        throw new Error(
          `Error getting transaction by ID: ${response.statusText}`
        );
      }
      return await response.json();
    } catch (error: any) {
      console.error("Error getting transaction by ID:", error);
      throw error;
    }
  },

  updateTransaction: async (id: number, data: any) => {
    try {
      const response = await fetch(
        `${SALES_SERVICE_BASE_URL}/transactions/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error(`Error updating transaction: ${response.statusText}`);
      }
      return await response.json();
    } catch (error: any) {
      console.error("Error updating transaction:", error);
      throw error;
    }
  },

  deleteTransaction: async (id: number) => {
    try {
      const response = await fetch(
        `${SALES_SERVICE_BASE_URL}/transactions/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Error deleting transaction: ${response.statusText}`);
      }
      return await response.json();
    } catch (error: any) {
      console.error("Error deleting transaction:", error);
      throw error;
    }
  },
};
