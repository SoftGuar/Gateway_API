import { FastifyInstance } from 'fastify';
import { pushNotificationsHandler } from '../../handlers//notifications/pushNotificationsHandler';

export async function pushRoutes(fastify: FastifyInstance) {
    fastify.post('/register-token',schema, pushNotificationsHandler.registerToken);
}

const schema = {
    schema:{
    description: 'Push notifications routes',
    tags: ['Notifications'],
    summary: 'Routes for managing push notifications',
    body: {
        type: 'object',
        properties: {
            token: { type: 'string' },
            userId: { type: 'number' },
            userType: { type: 'string' }
        },
        required: ['token', 'userId', 'userType']
    }, 
}
};