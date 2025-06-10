import { FastifyInstance, FastifyRequest } from "fastify";
import fastifyWebsocket from "@fastify/websocket";
import {websocketRouteHandler} from "../../handlers/notifications/websocketRouteHandler";



export default async function websocketRoute(fastify: FastifyInstance) {
    await fastify.register(fastifyWebsocket);
    fastify.get(
        "/ws/:user_id/:user_type",
        {
            websocket: true,
            schema: schema
        },
        (connection, req: FastifyRequest<{
            Params: { user_id: number, user_type: string }
        }>) => {
            websocketRouteHandler(req, connection);
        }
    );
}

const schema={
    description: 'WebSocket route for notifications',
    tags: ['Notifications'],
    summary: 'WebSocket connection for user notifications',
    params: {
        type: 'object',
        properties: {
            user_id: { type: 'number' },
            user_type: { type: 'string' }
        },
        required: ['user_id', 'user_type']
    }
}
    