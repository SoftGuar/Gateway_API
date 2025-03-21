const SALES_SERVICE_BASE_URL = process.env.SALES_SERVICE_BASE_URL
  ? `${process.env.SALES_SERVICE_BASE_URL}`
  : 'http://localhost:3003';

export const productService = {
  /**
   * Retrieves all products from the sales service.
   * @returns {Promise<Array<any>>} A promise that resolves to an array of product objects.
   * @throws {Error} If the request fails.
   */
  async getAllProducts(): Promise<Array<any>> {
    try {
      const response = await fetch(`${SALES_SERVICE_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to get products from sales service:", error);
      return []; // Return an empty array in case of an error
    }
  },

  /**
   * Retrieves a product by its ID from the sales service.
   * @param {number} id - The ID of the product to retrieve.
   * @returns {Promise<any>} A promise that resolves to the product object, or null if not found.
   * @throws {Error} If the request fails.
   */
  async getProductById(id: number): Promise<any> {
    try {
      const response = await fetch(`${SALES_SERVICE_BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to get product from sales service:", error);
      return null; // Return null in case of an error
    }
  },
};