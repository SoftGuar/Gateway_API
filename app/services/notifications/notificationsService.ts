
import { inAppChannelService } from "./inAppChannelService";
import { updateNotificationInput } from "./types/Notifications.types";
import { NotificationPayload } from "./types/payload";
const notificationIP = "http://localhost:3002";
export const notificationsService = {
    async notify(notification: NotificationPayload) {
        if(notification.channels.includes("in-app")){
            await inAppChannelService.sendNotification(notification);
        }
        const response = await fetch(`${notificationIP}/notify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(notification),
        });
        return response.json();
    },
    async getNotifications(userId: number) {
        const response = await fetch(`${notificationIP}/notifications/${userId}`);
        return response.json();
    },
    async createNotification(notification: NotificationPayload) {
        const response = await fetch(`${notificationIP}/notifications`, {
            method: "POST",
            body: JSON.stringify(
                {
                    requestId: notification.requestId,
                    timestamp: notification.timestamp,
                    notificationType: notification.notificationType,
                    channels: notification.channels,
                    broadcast: notification.broadcast,
                    recipient: notification.recipient,
                    message: notification.message,
                    schedule: notification.schedule,
                    metadata: notification.metadata
                }
            ),
        });
        return response.json();
    },
    async updateNotification(notificationId: number, notification: updateNotificationInput) {
        const response = await fetch(`${notificationIP}/notifications/${notificationId}`, {
            method: "PUT",
            body: JSON.stringify(notification),
        });
        return response.json();
    },
    async markNotificationAsRead(notificationId: number) {
        const response = await fetch(`${notificationIP}/notifications/${notificationId}/read`, {
            method: "PUT",
        });
        return response.json();
    },
    async markNotificationAsUnread(notificationId: number) {
        const response = await fetch(`${notificationIP}/notifications/${notificationId}/unread`, {
            method: "PUT",
        });
        return response.json();
    },
    async getNotificationById(notificationId: number) {
        const response = await fetch(`${notificationIP}/notifications/${notificationId}`);
        return response.json();
    },
    async deleteNotification(notificationId: number) {
        const response = await fetch(`${notificationIP}/notifications/${notificationId}`, {
            method: "DELETE",
        });
        return response.json();
    }

}

