import { FastifyInstance } from "fastify";
import { SystemHandler } from "../../../handlers/analytics/systemHandler";
import { getUptimeStatsSchema,getAnomaliesSchema,getDiskUsageSchema } from "./system.schema";
const systemHandler = new SystemHandler();

const systemRoutes = async (fastify: FastifyInstance): Promise<void> => {

  fastify.get("/system/uptime-stats",getUptimeStatsSchema, systemHandler.handleGetUptimeStats);
  fastify.get("/system/anomalies",getAnomaliesSchema, systemHandler.handleGetAnomalies);
  fastify.get("/system/disk-usage",getDiskUsageSchema, systemHandler.handleGetDiskUsage);
};

export default systemRoutes;
