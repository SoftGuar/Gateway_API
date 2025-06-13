import { appEmitter } from "../notifications/event";

export interface OrderInput {
  product_id: number;
  user_id: number;
  commercial_id: number;
}

const SALES_SERVICE_BASE_URL = process.env.SALES_SERVICE_BASE_URL
  ? `${process.env.SALES_SERVICE_BASE_URL}`
  : "http://localhost:3003";
export const orderService = {
  /**
   * Places an order by sending a request to the sales service.
   * Throws appropriate error messages for different failure scenarios.
   */
  order: async (data: OrderInput): Promise<object> => {
    // Validate input data
    if (!data.product_id || !data.user_id || !data.commercial_id) {
      throw new Error("Missing required order data");
    }

    try {
      // Send a request to the sales service to place the order
      const response = await fetch(`${SALES_SERVICE_BASE_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: data.product_id,
          user_id: data.user_id,
          commercial_id: data.commercial_id,
        }),
      });

      // Verify the response from the sales service
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Sales service error: ${errorData.message || "Unknown error"}`
        );
      }

      const responseData = await response.json();
      appEmitter.emit("sale.completed", {
        clientName: 'test',
        quantity: 'test',
        totalAmount: 'test',
      });
      return responseData;
    } catch (error: any) {
      // Handle errors from the sales service or network issues
      if (error.name === "TypeError") {
        // Handle network errors
        console.error("Network error:", error.message);
        throw new Error("Failed to connect to sales service");
      } else {
        // Generic error handling
        console.error("Order processing error:", error);
        throw new Error(`Failed to process order: ${error.message}`);
      }
    }
  },
};
