import {notificationsService} from '../../services/notifications/notificationsService';
import { FastifyRequest, FastifyReply } from 'fastify';
import {NotificationPayload} from '../../services/notifications/types/payload';
import { updateNotificationInput } from '../../services/notifications/types/Notifications.types';

export const notificationsHandler = {
    async notify(req: FastifyRequest<{ Body: NotificationPayload }>, res: FastifyReply) {
        try {
            const notificationData = req.body; // Assuming notification data is sent in the request body
            await notificationsService.notify(notificationData)
        }
        catch(error){
            console.error('Error notifying:', error);
            res.status(500).send({ error: 'Failed to notify' });
        }
    },
    async getNotifications(req: FastifyRequest<{ Params: { userId: number } }>, res: FastifyReply) {
        try {
            const userId = Number(req.params.userId); // Assuming userId is passed as a URL parameter
            const notifications = await notificationsService.getNotifications(userId);
            res.status(201).send(notifications);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            res.status(500).send({ error: 'Failed to fetch notifications' });
        }
    },

    async createNotification(req: FastifyRequest<{ Body: NotificationPayload }>, res: FastifyReply) {
        try {
            const notificationData = req.body; // Assuming notification data is sent in the request body
            await notificationsService.createNotification(notificationData)
            res.status(201).send(notificationData);
        } catch (error) {
            console.error('Error creating notification:', error);
            res.status(500).send({ error: 'Failed to create notification' });
        }
    },
    
    async updateNotification(req: FastifyRequest<{ 
        Params: { notificationId: number } ,
        Body: updateNotificationInput
    }>, res: FastifyReply) {
        try {
            const notificationId = Number(req.params.notificationId);
            const updateData = req.body;
            const notification = await notificationsService.updateNotification(notificationId, updateData);
            res.status(201).send(notification);
        } catch (error) {
            console.error('Error updating notification:', error);
            res.status(500).send({ error: 'Failed to update notification' });
        }
    },
    async markNotificationAsRead(req: FastifyRequest<{ Params: { notificationId: number } }>, res: FastifyReply) {
        try {
            const notificationId = Number(req.params.notificationId);
            const notification = await notificationsService.markNotificationAsRead(notificationId);
            res.status(201).send(notification);
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    },
    async markNotificationAsUnread(req: FastifyRequest<{ Params: { notificationId: number } }>, res: FastifyReply) {
        try {
            const notificationId = Number(req.params.notificationId);
            const notification = await notificationsService.markNotificationAsUnread(notificationId);
            res.status(201).send(notification);
        } catch (error) {
            console.error('Error marking notification as unread:', error);
        }
    },
    async getNotificationById(req: FastifyRequest<{ Params: { notificationId: number } }>, res: FastifyReply) {
        try {
            const notificationId = Number(req.params.notificationId);
            const notification = await notificationsService.getNotificationById(notificationId);
            res.status(201).send(notification);
        } catch (error) {
            console.error('Error fetching notification by ID:', error);
            res.status(500).send({ error: 'Failed to fetch notification by ID' });
        }
    },
    async deleteNotification(req: FastifyRequest<{ Params: { notificationId: number } }>, res: FastifyReply) {
        try {
            const notificationId = Number(req.params.notificationId);
            const notification = await notificationsService.deleteNotification(notificationId);
            res.status(201).send(notification);
        } catch (error) {
            console.error('Error deleting notification:', error);
            res.status(500).send({ error: 'Failed to delete notification' });
        }
    }
}
