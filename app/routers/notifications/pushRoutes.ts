import { FastifyInstance } from 'fastify';
import { pushNotificationsHandler } from '../../handlers//notifications/pushNotificationsHandler';

export async function pushRoutes(fastify: FastifyInstance) {
    fastify.post('/register-token', pushNotificationsHandler.registerToken);
}