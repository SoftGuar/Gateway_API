import { FastifyReply, FastifyRequest } from "fastify";
import { QuotationService } from "../../services/analytics/QuotationsService";

export class QuotationHandler {
    static async countConvertedQuotations(req: FastifyRequest, reply: FastifyReply) {
        try {
            const data = await new QuotationService().countConvertedQuotations();
            reply.status(200).send(data);
        } catch (error) {
            console.error("Error in countConvertedQuotations handler:", error);
            reply.status(500).send({ error: "Failed to fetch converted quotations count" });
        }
    }

    static async averageTimeToConversion(req: FastifyRequest, reply: FastifyReply) {
        try {
            const data = await new QuotationService().averageTimeToConversion();
            reply.status(200).send(data);
        } catch (error) {
            console.error("Error in averageTimeToConversion handler:", error);
            reply.status(500).send({ error: "Failed to fetch average time to conversion" });
        }
    }

    static async mostFrequentlyQuotedProducts(req: FastifyRequest, reply: FastifyReply) {
        try {
            const data = await new QuotationService().mostFrequentlyQuotedProducts();
            reply.status(200).send(data);
        } catch (error) {
            console.error("Error in mostFrequentlyQuotedProducts handler:", error);
            reply.status(500).send({ error: "Failed to fetch most frequently quoted products" });
        }
    }

    static async productConversionRate(req: FastifyRequest, reply: FastifyReply) {
        try {
            const data = await new QuotationService().productConversionRate();
            reply.status(200).send(data);
        } catch (error) {
            console.error("Error in productConversionRate handler:", error);
            reply.status(500).send({ error: "Failed to fetch product conversion rate" });
        }
    }

    static async totalQuotationValueByProduct(req: FastifyRequest, reply: FastifyReply) {
        try {
            const data = await new QuotationService().totalQuotationValueByProduct();
            reply.status(200).send(data);
        } catch (error) {
            console.error("Error in totalQuotationValueByProduct handler:", error);
            reply.status(500).send({ error: "Failed to fetch total quotation value by product" });
        }
    }

    static async clientsWithMostUnconvertedQuotations(req: FastifyRequest, reply: FastifyReply) {
        try {
            const data = await new QuotationService().clientsWithMostUnconvertedQuotations();
            reply.status(200).send(data);
        } catch (error) {
            console.error("Error in clientsWithMostUnconvertedQuotations handler:", error);
            reply.status(500).send({ error: "Failed to fetch clients with most unconverted quotations" });
        }
    }

    static async totalQuotationsCreated(req: FastifyRequest, reply: FastifyReply) {
        try {
            const data = await new QuotationService().totalQuotationsCreated();
            reply.status(200).send(data);
        } catch (error) {
            console.error("Error in totalQuotationsCreated handler:", error);
            reply.status(500).send({ error: "Failed to fetch total quotations created" });
        }
    }

    static async averageProductsPerQuotation(req: FastifyRequest, reply: FastifyReply) {
        try {
            const data = await new QuotationService().averageProductsPerQuotation();
            reply.status(200).send(data);
        } catch (error) {
            console.error("Error in averageProductsPerQuotation handler:", error);
            reply.status(500).send({ error: "Failed to fetch average products per quotation" });
        }
    }

    static async averageQuotationValue(req: FastifyRequest, reply: FastifyReply) {
        try {
            const data = await new QuotationService().averageQuotationValue();
            reply.status(200).send(data);
        } catch (error) {
            console.error("Error in averageQuotationValue handler:", error);
            reply.status(500).send({ error: "Failed to fetch average quotation value" });
        }
    }
}