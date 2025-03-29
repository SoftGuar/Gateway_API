import { FastifyInstance } from "fastify";
import {
    getTopVisitedZonesHandler,
    getAverageTimeSpentHandler,
    getHighestObstaclesHandler,
} from "../../../handlers/analytics/ZonesHandler";
import { zoneSchemas } from "./ZoneSchemas";
export async function zonesRoutes(fastify: FastifyInstance) {
    fastify.get(
        "/zones/top-visited",
        { schema: zoneSchemas.TopVisitedZonesSchema.schema },
        getTopVisitedZonesHandler
    );
    fastify.get(
        "/zones/average-time-spent",
        { schema: zoneSchemas.AverageTimeSpentInZonesSchema.schema },
        getAverageTimeSpentHandler
    );
    fastify.get(
        "/zones/highest-obstacles",
        { schema: zoneSchemas.ZonesWithHighestObstacleCountSchema.schema },
        getHighestObstaclesHandler
    );
}