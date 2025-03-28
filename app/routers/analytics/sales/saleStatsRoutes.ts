import { FastifyInstance } from "fastify";
import { SalesStatsHandler } from "../../../handlers/analytics/salesStatsHandler";
import { salesSchemas } from "./salesSchemas";

export async function salesStatsRoutes(fastify: FastifyInstance): Promise<void> {
    const salesStatsHandler = new SalesStatsHandler();

    fastify.get("/sales-stats/crr", salesSchemas.CRRSchema ,salesStatsHandler.getCRR);
    fastify.get("/sales-stats/crr/details",salesSchemas.CustomerRetentionDetailsSchema, salesStatsHandler.getCustomerRetentionDetails);
}