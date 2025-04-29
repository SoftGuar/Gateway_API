import { appEmitter } from "../event";
import { NotificationPayload } from "../types/payload";
import { randomUUID } from "crypto";
import { notificationsService } from "../notificationsService";
import { AdminService } from "../../accountManagementService/admin.service";
import { NotificationRecipient } from "../notificationListener";

export default function setupNotificationListenersEnvironment() {
    appEmitter.on("navigation.obstacle.detected", async (data) => {
        if (!data.userId) return;
    
        const notification: NotificationPayload = {
          requestId: randomUUID(),
          timestamp: new Date().toISOString(),
          notificationType: "navigation.obstacle",
          channels: ["in-app"],
          broadcast: false,
          recipient: [{
            userId: data.userId,
            email: data.email
          }],
          message: {
            subject: "Obstacle Alert",
            body: `Obstacle detected ${data.distance}m ahead. Route recalculation in progress.`,
            attachments: [],
            pushNotification: {
              title: "Obstacle Ahead",
              body: `Obstacle detected. Recalculating route.`,
            },
          },
          schedule: undefined,
          metadata:undefined,
        };
        notificationsService.notify(notification);
      });
    
      appEmitter.on("navigation.destination.reached", async (data) => {
        const notification: NotificationPayload = {
          requestId: randomUUID(),
          timestamp: new Date().toISOString(),
          notificationType: "navigation.destination",
          channels: ["in-app"],
          broadcast: false,
          recipient: [{
            userId: data.userId,
            email: data.mail
          }],
          message: {
            subject: "Destination Reached",
            body: `You have reached your destination: ${data.destinationName}`,
            attachments: [],
            pushNotification: {
              title: "Arrived",
              body: `You have reached ${data.destinationName}`,
            },
          },
          schedule: undefined,
          metadata:undefined,
        };
        notificationsService.notify(notification);
      });
    
      appEmitter.on("navigation.zone.entered", async (data) => {
        // Notification for user entering a zone
        const notification: NotificationPayload = {
          requestId: randomUUID(),
          timestamp: new Date().toISOString(),
          notificationType: "navigation.zone",
          channels: ["in-app"],
          broadcast: false,
          recipient: [{
            userId: data.userId,
            email:data.email
          }],
          message: {
            subject: "Zone Notification",
            body: `You have entered the ${data.zoneName} zone.`,
            attachments: [],
            pushNotification: {
              title: "Zone Change",
              body: `Now in ${data.zoneName} zone`,
            },
          },
          schedule: undefined,
          metadata: undefined,
        };
        notificationsService.notify(notification);
    
        // Special notification for danger zones
        if (data.zoneType === "DANGER") {
          const dangerNotification: NotificationPayload = {
            requestId: randomUUID(),
            timestamp: new Date().toISOString(),
            notificationType: "navigation.zone.danger",
            channels: ["in-app"],
            broadcast: false,
            recipient: [{
              userId: data.userId,
              email:data.email
            }],
            message: {
              subject: "CAUTION: Danger Zone",
              body: `You have entered a DANGER zone. Please proceed with extreme caution or consider an alternative route.`,
              attachments: [],
              pushNotification: {
                title: "⚠️ DANGER ZONE ⚠️",
                body: `Exercise extreme caution!`,
              },
            },
            schedule: undefined,
            metadata:undefined,
          };
          notificationsService.notify(dangerNotification);
        }
      });

      appEmitter.on("environment.updated", async (data) => {
          const adminService = new AdminService();
          const admins = await adminService.getAdmins();
          const adminRecipients: NotificationRecipient[] = admins.map(admin => ({
            userId: admin.id,
            email: admin.email,
          }));
      
          const notification: NotificationPayload = {
            requestId: randomUUID(),
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
            requestId: randomUUID(),
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