const ANALYTICS_SERVICE_BASE_URL = process.env.ANALYTICS_SERVICE_BASE_URL
    ? `${process.env.ANALYTICS_SERVICE_BASE_URL}`
    : "http://localhost:3004";

export class QuotationService {
    private async fetchFromAnalyticsService<T>(endpoint: string, method: string = "GET", body?: any): Promise<T> {
        try {
            const response = await fetch(`${ANALYTICS_SERVICE_BASE_URL}${endpoint}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: body ? JSON.stringify(body) : undefined,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Analytics service error: ${errorData.message || "Unknown error"}`);
            }

            return await response.json();
        } catch (error: any) {
            console.error(`Error fetching from analytics service (${endpoint}):`, error);
            throw new Error(`Failed to fetch from analytics service: ${error.message}`);
        }
    }

    async countConvertedQuotations(): Promise<{ ConvertedQuotations: number; taux_conversion: number }> {
        return this.fetchFromAnalyticsService<{ ConvertedQuotations: number; taux_conversion: number }>(
            "/quotations/converted"
        );
    }

    async averageTimeToConversion(): Promise<number | null> {
        return this.fetchFromAnalyticsService<number | null>("/quotations/average-time-to-conversion");
    }

    async mostFrequentlyQuotedProducts(): Promise<{ product_id: number; count: number }[]> {
        return this.fetchFromAnalyticsService<{ product_id: number; count: number }[]>(
            "/quotations/most-frequently-quoted-products"
        );
    }

    async productConversionRate(): Promise<{ product_id: number; conversion_rate: number }[]> {
        return this.fetchFromAnalyticsService<{ product_id: number; conversion_rate: number }[]>(
            "/quotations/product-conversion-rate"
        );
    }

    async totalQuotationValueByProduct(): Promise<{ product_id: number; total_value: number }[]> {
        return this.fetchFromAnalyticsService<{ product_id: number; total_value: number }[]>(
            "/quotations/total-value-by-product"
        );
    }

    async clientsWithMostUnconvertedQuotations(): Promise<{ user_id: number; unconverted_count: number }[]> {
        return this.fetchFromAnalyticsService<{ user_id: number; unconverted_count: number }[]>(
            "/quotations/clients-with-most-unconverted"
        );
    }

    async totalQuotationsCreated(): Promise<number> {
        return this.fetchFromAnalyticsService<number>("/quotations/total-created");
    }

    async averageProductsPerQuotation(): Promise<number | null> {
        return this.fetchFromAnalyticsService<number | null>("/quotations/average-products-per-quotation");
    }

    async averageQuotationValue(): Promise<number | null> {
        return this.fetchFromAnalyticsService<number | null>("/quotations/average-value");
    }
}
