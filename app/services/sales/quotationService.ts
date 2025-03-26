const SALES_SERVICE_BASE_URL = process.env.SALES_SERVICE_BASE_URL
  ? `${process.env.SALES_SERVICE_BASE_URL}`
  : "http://localhost:3003";

export const QuotationService = {
  /**
   * Creates a new quotation in the sales service.
   * @param {Object} data - The quotation data to create.
   * @returns {Promise<Object>} A promise that resolves to the created quotation object.
   * @throws {Error} If the quotation creation fails.
   */
  createQuotation: async (data: any) => {
    try {
      const response = await fetch(`${SALES_SERVICE_BASE_URL}/quotations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating quotation:", error);
      throw new Error("Failed to create quotation");
    }
  },

  /**
   * Retrieves a quotation by its ID from the sales service.
   * @param {number} id - The ID of the quotation to retrieve.
   * @returns {Promise<Object>} A promise that resolves to the quotation object.
   * @throws {Error} If the quotation is not found or the request fails.
   */
  getQuotationById: async (id: number) => {
    try {
      const response = await fetch(
        `${SALES_SERVICE_BASE_URL}/quotations/${id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching quotation by ID:", error);
      throw new Error("Failed to fetch quotation by ID");
    }
  },

  /**
   * Retrieves all quotations from the sales service.
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of quotation objects.
   * @throws {Error} If the request fails.
   */
  getAllQuotations: async () => {
    try {
      const response = await fetch(`${SALES_SERVICE_BASE_URL}/quotations`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching all quotations:", error);
      throw new Error("Failed to fetch all quotations");
    }
  },

  /**
   * Updates an existing quotation in the sales service.
   * @param {number} id - The ID of the quotation to update.
   * @param {Object} data - The updated quotation data.
   * @returns {Promise<Object>} A promise that resolves to the updated quotation object.
   * @throws {Error} If the quotation update fails.
   */
  updateQuotation: async (id: number, data: any) => {
    try {
      const response = await fetch(
        `${SALES_SERVICE_BASE_URL}/quotations/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating quotation:", error);
      throw new Error("Failed to update quotation");
    }
  },

  /**
   * Deletes a quotation from the sales service.
   * @param {number} id - The ID of the quotation to delete.
   * @returns {Promise<Object>} A promise that resolves to the deleted quotation object.
   * @throws {Error} If the quotation deletion fails.
   */
  deleteQuotation: async (id: number) => {
    try {
      const response = await fetch(
        `${SALES_SERVICE_BASE_URL}/quotations/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error deleting quotation:", error);
      throw new Error("Failed to delete quotation");
    }
  },

  /**
   * Associates a product with a quotation in the sales service.
   * @param {number} quotationId - The ID of the quotation.
   * @param {number} productId - The ID of the product to associate.
   * @param {number} count - The quantity of the product to associate.
   * @returns {Promise<Object>} A promise that resolves to the association result.
   * @throws {Error} If the association fails.
   */
  associateProduct: async (
    quotation_id: number,
    product_id: number,
    count: number
  ) => {
    try {
      const response = await fetch(
        `${SALES_SERVICE_BASE_URL}/quotations/ssociate/${quotation_id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product_id, count }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error associating product with quotation:", error);
      throw new Error("Failed to associate product with quotation");
    }
  },

  /**
   * Retrieves quotations by user ID from the sales service.
   * @param {number} userId - The ID of the user to retrieve quotations for.
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of quotation objects.
   * @throws {Error} If the request fails.
   */
  findByUserId: async (user_id: number) => {
    try {
      const response = await fetch(
        `${SALES_SERVICE_BASE_URL}/quotations/user/${user_id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error finding quotations by user ID:", error);
      throw new Error("Failed to find quotations by user ID");
    }
  },

  /**
   * Creates a quotation request with associated products in the sales service.
   * @param {number} userId - The ID of the user creating the quotation.
   * @param {Array<{ productId: number, count: number }>} products - An array of products to associate with the quotation.
   * @returns {Promise<void>} A promise that resolves when the quotation request is created.
   * @throws {Error} If the quotation request creation fails.
   */
  demandeQuotation: async (
    user_id: number,
    products: { productId: number; count: number }[]
  ) => {
    try {
      const response = await fetch(
        `${SALES_SERVICE_BASE_URL}/quotations/demande`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id, products }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("Message:", data.message);
      console.log("Quotation:", data.quotation);

      return data.quotation;
    } catch (error) {
      console.error("Error creating quotation request:", error);
      throw new Error("Failed to create quotation request");
    }
  },
};
