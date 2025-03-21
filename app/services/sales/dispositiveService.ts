const SALES_SERVICE_BASE_URL = process.env.SALES_SERVICE_BASE_URL
  ?`${process.env.SALES_SERVICE_BASE_URL}` : 'http://localhost:3003';

const dispositiveService = {
    /**
     * Retrieves all dispositives from the sales service.
     * @returns {Promise<Array>} An array of dispositive objects, or an empty array if an error occurs.
     */
    async getAllDispositives(): Promise<Array<any>> {
        try {
            const response = await fetch(`${SALES_SERVICE_BASE_URL}/dispositives`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Failed to get dispositives from sales service:", error);
            return []; // Return an empty array in case of an error
        }
    },

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
