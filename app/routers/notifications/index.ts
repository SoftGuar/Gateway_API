import { FastifyInstance } from 'fastify';
import websocketRoute from './websocketRoute';
import {registerNotificationRoutes} from './notificationRoutes';
export default async function registerRoutesNotifications(fastify: FastifyInstance) {
    fastify.register(websocketRoute, { prefix: '/websocket' });
    fastify.register((fastify) => { registerNotificationRoutes(fastify); }, { prefix: '/' });
}
