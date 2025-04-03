import { FastifyInstance } from "fastify";
import { QuotationHandler } from "../../../handlers/analytics/quotationHandler";
import { quotationsSchemas } from "./quotationsSchemas";
export async function quotationsRoutes(fastify: FastifyInstance): Promise<void> {
    fastify.get(
        "/quotations/count-converted",
        { schema: quotationsSchemas.countConvertedQuotations },
        QuotationHandler.countConvertedQuotations
    );
    fastify.get(
        "/quotations/average-time-to-conversion",
        { schema: quotationsSchemas.averageTimeToConversion },
        QuotationHandler.averageTimeToConversion
    );
    fastify.get(
        "/quotations/most-frequently-quoted-products",
        { schema: quotationsSchemas.mostFrequentlyQuotedProducts },
        QuotationHandler.mostFrequentlyQuotedProducts
    );
    fastify.get(
        "/quotations/product-conversion-rate",
        { schema: quotationsSchemas.productConversionRate },
        QuotationHandler.productConversionRate
    );
    fastify.get(
        "/quotations/total-value-by-product",
        { schema: quotationsSchemas.totalQuotationValueByProduct },
        QuotationHandler.totalQuotationValueByProduct
    );
    fastify.get(
        "/quotations/clients-with-most-unconverted",
        { schema: quotationsSchemas.clientsWithMostUnconvertedQuotations },
        QuotationHandler.clientsWithMostUnconvertedQuotations
    );
    fastify.get(
        "/quotations/total-created",
        { schema: quotationsSchemas.totalQuotationsCreated },
        QuotationHandler.totalQuotationsCreated
    );
    fastify.get(
        "/quotations/average-products-per-quotation",
        { schema: quotationsSchemas.averageProductsPerQuotation },
        QuotationHandler.averageProductsPerQuotation
    );
    fastify.get(
        "/quotations/average-value",
        { schema: quotationsSchemas.averageQuotationValue },
        QuotationHandler.averageQuotationValue
    );
}