const SALES_SERVICE_BASE_URL = process.env.SALES_SERVICE_BASE_URL
  ? `${process.env.SALES_SERVICE_BASE_URL}`
  : "http://localhost:3003";

const dispositiveService = {
  /**
   * Finds an available dispositive for a specific product from the sales service.
   * @param {number} product_id - The ID of the product to find an available dispositive for.
   * @returns {Promise<Object>} The available dispositive object.
   * @throws {Error} If no available dispositive is found or an error occurs.
   */
  async findAvailableDispositive(product_id: number): Promise<any> {
    try {
      const url = new URL(`${SALES_SERVICE_BASE_URL}/dispositives`);
      url.searchParams.append("product_id", product_id.toString());

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data) {
        throw new Error("No available dispositive found for the product");
      }
      return data;
    } catch (error) {
      console.error("Failed to get dispositive from sales service:", error);
      return [];
    }
  },
};

export default dispositiveService;
