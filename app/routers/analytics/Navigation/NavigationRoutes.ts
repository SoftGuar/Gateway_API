import { FastifyInstance } from "fastify";
import {
    getNavigationLogs,
    getMostReroutingRequests,
    getSuccessfulNavigations} from "../../../handlers/analytics/NavigationHandler";
import { navigationSchemas } from "./NavigationSchemas";

export async function navigationRoutes(fastify: FastifyInstance) {
    fastify.get("/navigation/logs",navigationSchemas.NavigationLogsSchema , getNavigationLogs);
    fastify.get("/navigation/most-rerouting-requests",navigationSchemas.MostReroutingRequestsSchema, getMostReroutingRequests);
    fastify.get("/navigation/successful",navigationSchemas.SuccessfulNavigationsSchema, getSuccessfulNavigations);
}