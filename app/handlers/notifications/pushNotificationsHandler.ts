import { FastifyRequest, FastifyReply } from 'fastify';
import { notificationsService } from '../../services/notifications/notificationsService';
export const pushNotificationsHandler = {
    async registerToken(req: FastifyRequest<{ Body: { userId: number, userType: string, token: string, deviceInfo?: object } }>, res: FastifyReply) {
        try {
            const { userId, userType, token, deviceInfo } = req.body;
            const result = await notificationsService.registerToken(userId, userType, token, deviceInfo);
            res.status(201).send(result);
        } catch (error) {
            console.error('Error registering token:', error);
            res.status(500).send({ error: 'Failed to register token' });
        }
    },

};
