import { FastifyInstance } from "fastify";
import { UserHandler } from "../../../handlers/analytics/UserHandler";
import { userSchemas } from "./UserSchemas";

export async function UserRoutes(fastify: FastifyInstance) {
    fastify.get("/users/total", {
        schema: userSchemas.UserTotalSchema.schema
    }, UserHandler.getTotalUsers);
    fastify.get("/users/top", {
        schema: userSchemas.TopUsersSchema.schema
    }, UserHandler.getTopUsers);

    fastify.get("/users/ratings", {
        schema: userSchemas.UserRatingsSchema.schema
    }, UserHandler.getUserRatings);

    fastify.get("/users/feedback", {
        schema: userSchemas.UserFeedbackSchema.schema
    }, UserHandler.getUserFeedback);

    fastify.get("/users/session-durations", {
        schema: userSchemas.UserSessionDurationSchema.schema
    }, UserHandler.getUserSessionDuration);

    fastify.get("/users/daily-active", {
        schema: userSchemas.DAUsSchema.schema
    }, UserHandler.getDAUs);

    fastify.get("/users/weekly-active", {
        schema: userSchemas.WAUsSchema.schema
    }, UserHandler.getWAUs);

    fastify.get("/users/monthly-active", {
        schema: userSchemas.MAUsSchema.schema
    }, UserHandler.getMAUs);
}