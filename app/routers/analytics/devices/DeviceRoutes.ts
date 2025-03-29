import { FastifyInstance } from "fastify";
import { DeviceHandler } from "../../../handlers/analytics/DeviceHandler";
import { deviceSchemas } from "./deviceRoutesSchemas";
export async function DeviceRoutes(fastify: FastifyInstance) {
    fastify.get("/device/total", deviceSchemas.DeviceTotalSchema, DeviceHandler.getDeviceTotal);
    fastify.get("/device/status",deviceSchemas.DeviceStatusSchema, DeviceHandler.getDeviceStatus);
    fastify.get("/device/issues",deviceSchemas.DeviceIssuesOverTimeSchema, DeviceHandler.getDeviceIssuesOverTime);
    fastify.get("/device/performance",deviceSchemas.DevicePerformanceSchema, DeviceHandler.getDevicePerformance);
    fastify.get("/device/issues/list",deviceSchemas.DeviceIssuesSchema, DeviceHandler.getDeviceIssues);
    fastify.get("/device/sold", deviceSchemas.DevicesSoldSchema ,DeviceHandler.devicesSold);
    fastify.get("/device/revenue", deviceSchemas.DeviceRevenueSchema ,DeviceHandler.deviceRevenue);
    fastify.get("/device/popular",deviceSchemas.MostPopularDevicesSchema, DeviceHandler.getMostPopularDevices);
    fastify.get("/device/interventions",deviceSchemas.DeviceInterventionSchema, DeviceHandler.getDeviceIntervention);
}