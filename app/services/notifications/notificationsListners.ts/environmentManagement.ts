import { appEmitter } from "../event";
import { NotificationPayload } from "../types/payload";
import { randomInt, randomUUID } from "crypto";
import { notificationsService } from "../notificationsService";
import { AdminService } from "../../accountManagementService/admin.service";
import { NotificationRecipient } from "../notificationListener";

export default function setupNotificationListenersEnvironment() {

      appEmitter.on("environment.updated", async (data) => {
          const adminService = new AdminService();
          const admins = await adminService.getAdmins();
          const adminRecipients: NotificationRecipient[] = admins.map(admin => ({
            userId: admin.id,
            email: admin.email,
          }));
      
          const notification: NotificationPayload = {
            requestId: randomInt(1, 999999),
            timestamp: new Date().toISOString(),
            notificationType: "environment.updated",
            channels: ["in-app", "email"],
            broadcast: false,
            recipient: adminRecipients,
            message: {
              subject: "Environment Updated",
              body: `Environment "${data.environmentName}" has been updated by ${data.updatedBy}. Changes: ${data.changes}`,
              attachments: [],
              pushNotification: {
                title: "Environment Update",
                body: `${data.environmentName} has been updated`,
              },
            },
            schedule: undefined,
            metadata:undefined,
             
          };
          notificationsService.notify(notification);
        });
      
        appEmitter.on("poi.created", async (data) => {
          const adminService = new AdminService();
          const admins = await adminService.getAdmins();
          const adminRecipients: NotificationRecipient[] = admins.map(admin => ({
            userId: admin.id,
            email: admin.email,
          }));
      
          const notification: NotificationPayload = {
            requestId: randomInt(1, 999999),
            timestamp: new Date().toISOString(),
            notificationType: "poi.created",
            channels: ["in-app"],
            broadcast: false,
            recipient: adminRecipients,
            message: {
              subject: "New POI Created",
              body: `New Point of Interest "${data.poiName}" (Category: ${data.category}) has been added to environment "${data.environmentName}" by ${data.createdBy}.`,
              attachments: [],
              pushNotification: {
                title: "New POI",
                body: `${data.poiName} added to ${data.environmentName}`,
              },
            },
            schedule: undefined,
            metadata:undefined,
              
          };
          notificationsService.notify(notification);
        });
}