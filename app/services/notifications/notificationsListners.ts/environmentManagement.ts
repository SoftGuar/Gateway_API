import { appEmitter } from "../event";
import { NotificationPayload } from "../types/payload";
import { randomInt, randomUUID } from "crypto";
import { notificationsService } from "../notificationsService";
import { AdminService } from "../../accountManagementService/admin.service";
import { NotificationRecipient } from "../notificationListener";

export default function setupNotificationListenersEnvironment() {
      appEmitter.on("environment.created", async (data) => {
          const adminService = new AdminService();
          const admins = await adminService.getAdmins();
          const adminRecipients: NotificationRecipient[] = admins.map(admin => ({
            userId: admin.id,
            userType: "ADMIN",
            email: admin.email,
          }));
          const notification: NotificationPayload = {
            requestId: randomInt(1, 999999),
            timestamp: new Date().toISOString(),
            notificationType: "environment.created",
            channels: ["in-app", "email"],
            broadcast: false,
            recipient: adminRecipients,
            message: {
              subject: "New Environment Created",
              body: `A new environment "${data.name}" has been created.`,
              attachments: [],
              pushNotification: {
                title: "New Environment",
                body: `${data.name} has been created.`,
              },
            },
            schedule: undefined,
            metadata:undefined,
             
          };
          notificationsService.notify(notification);
      });

      appEmitter.on("zone.created", async (data) => {
          const adminService = new AdminService();
          const admins = await adminService.getAdmins();
          const adminRecipients: NotificationRecipient[] = admins.map(admin => ({
            userId: admin.id,
            userType: "ADMIN",
            email: admin.email,
          }));
          const notification: NotificationPayload = {
            requestId: randomInt(1, 999999),
            timestamp: new Date().toISOString(),
            notificationType: "zone.created",
            channels: ["in-app", "email"],
            broadcast: false,
            recipient: adminRecipients,
            message: {
              subject: "New Zone Created",
              body: `A new zone "${data.zoneName}" has been created.`,
              attachments: [],
              pushNotification: {
                title: "New Zone",
                body: `${data.zoneName} has been created.`,
              },
            },
            schedule: undefined,
            metadata:undefined,

          };
          notificationsService.notify(notification);
      });

      appEmitter.on("zone.updated", async (data) => {
          const adminService = new AdminService();
          const admins = await adminService.getAdmins();
          const adminRecipients: NotificationRecipient[] = admins.map(admin => ({
            userId: admin.id,
            userType: "ADMIN",
            email: admin.email,
          }));
          const notification: NotificationPayload = {
            requestId: randomInt(1, 999999),
            timestamp: new Date().toISOString(),
            notificationType: "zone.updated",
            channels: ["in-app", "email"],
            broadcast: false,
            recipient: adminRecipients,
            message: {
              subject: "Zone Updated",
              body: `The zone "${data.zoneName}" has been updated.`,
              attachments: [],
              pushNotification: {
                title: "Zone Updated",
                body: `${data.zoneName} has been updated.`,
              },
            },
            schedule: undefined,
            metadata:undefined,

          };
          notificationsService.notify(notification);
      });

      appEmitter.on("zone.deleted", async (data) => {
          const adminService = new AdminService();
          const admins = await adminService.getAdmins();
          const adminRecipients: NotificationRecipient[] = admins.map(admin => ({
            userId: admin.id,
            userType: "ADMIN",
            email: admin.email,
          }));
          const notification: NotificationPayload = {
            requestId: randomInt(1, 999999),
            timestamp: new Date().toISOString(),
            notificationType: "zone.deleted",
            channels: ["in-app"],
            broadcast: false,
            recipient: adminRecipients,
            message: {
              subject: "Zone Deleted",
              body: `The zone "${data.zoneId}" has been deleted.`,
              attachments: [],
              pushNotification: {
                title: "Zone Deleted",
                body: `${data.zoneId} has been deleted.`,
              },
            },
            schedule: undefined,
            metadata:undefined,

          };
          console.log("Zone deleted notification payload:", notification);
          notificationsService.notify(notification);
      });

      appEmitter.on("poi.created", async (data) => {  
          const adminService = new AdminService();
          const admins = await adminService.getAdmins();
          const adminRecipients: NotificationRecipient[] = admins.map(admin => ({
            userId: admin.id,
            userType: "ADMIN",
            email: admin.email,
          }));
          const notification: NotificationPayload = {
            requestId: randomInt(1, 999999),
            timestamp: new Date().toISOString(),
            notificationType: "poi.created",
            channels: ["in-app", "email"],
            broadcast: false,
            recipient: adminRecipients,
            message: {
              subject: "New POI Created",
              body: `A new POI "${data.poiName}" has been created.`,
              attachments: [],
              pushNotification: {
                title: "New POI",
                body: `${data.poiName} has been created`,
              },
            },
            schedule: undefined,
            metadata:undefined,

          };
          notificationsService.notify(notification);
      });
      appEmitter.on("poi.updated", async (data) => {
          const adminService = new AdminService();
          const admins = await adminService.getAdmins();
          const adminRecipients: NotificationRecipient[] = admins.map(admin => ({
            userId: admin.id,
            userType: "ADMIN",
            email: admin.email,
          }));
          const notification: NotificationPayload = {
            requestId: randomInt(1, 999999),
            timestamp: new Date().toISOString(),
            notificationType: "poi.updated",
            channels: ["in-app", "email"],
            broadcast: false,
            recipient: adminRecipients,
            message: {
              subject: "POI Updated",
              body: `The POI "${data.poiName}" has been updated.`,
              attachments: [],
              pushNotification: {
                title: "POI Updated",
                body: `${data.poiName} has been updated.`,
              },
            },
            schedule: undefined,
            metadata:undefined,

          };
          notificationsService.notify(notification);
      });
      appEmitter.on("poi.deleted", async (data) => {
          const adminService = new AdminService();
          const admins = await adminService.getAdmins();
          const adminRecipients: NotificationRecipient[] = admins.map(admin => ({
            userId: admin.id,
            userType: "ADMIN",
            email: admin.email,
          }));
          const notification: NotificationPayload = {
            requestId: randomInt(1, 999999),
            timestamp: new Date().toISOString(),
            notificationType: "poi.deleted",
            channels: ["in-app", "email"],
            broadcast: false,
            recipient: adminRecipients,
            message: {
              subject: "POI Deleted",
              body: `The POI "${data.poiId}" has been deleted.`,
              attachments: [],
              pushNotification: {
                title: "POI Deleted",
                body: `${data.poiId} has been deleted.`,
              },
            },
            schedule: undefined,
            metadata:undefined,

          };
          notificationsService.notify(notification);
      });

      appEmitter.on("floor.created", async (data) => {
        const adminService = new AdminService();
        const admins = await adminService.getAdmins();
        const adminRecipients: NotificationRecipient[] = admins.map(admin => ({
          userId: admin.id,
          userType: "ADMIN",
          email: admin.email,
        }));
        const notification: NotificationPayload = {
          requestId: randomInt(1, 999999),
          timestamp: new Date().toISOString(),
          notificationType: "floor.created",
          channels: ["in-app", "email"],
          broadcast: false,
          recipient: adminRecipients,
          message: {
            subject: "New Floor Created",
            body: `A new floor "${data.floorName}" has been created.`,
            attachments: [],
            pushNotification: {
              title: "New Floor",
              body: `${data.floorName} has been created at environment ${data.environmentId}.`,
            },
          },
          schedule: undefined,
          metadata: undefined,
        };
        notificationsService.notify(notification);
      });

      appEmitter.on("floor.updated", async (data) => {
        const adminService = new AdminService();
        const admins = await adminService.getAdmins();
        const adminRecipients: NotificationRecipient[] = admins.map(admin => ({
          userId: admin.id,
          userType: "ADMIN",
          email: admin.email,
        }));
        const notification: NotificationPayload = {
          requestId: randomInt(1, 999999),
          timestamp: new Date().toISOString(),
          notificationType: "floor.updated",
          channels: ["in-app", "email"],
          broadcast: false,
          recipient: adminRecipients,
          message: {
            subject: "Floor Updated",
            body: `The floor "${data.floorId}" has been updated.`,
            attachments: [],
            pushNotification: {
              title: "Floor Updated",
              body: `${data.floorId} has been updated.`,
            },
          },
          schedule: undefined,
          metadata: undefined,
        };
        notificationsService.notify(notification);
      });
      appEmitter.on("floor.deleted", async (data) => {
        const adminService = new AdminService();
        const admins = await adminService.getAdmins();
        const adminRecipients: NotificationRecipient[] = admins.map(admin => ({
          userId: admin.id,
          userType: "ADMIN",
          email: admin.email,
        }));
        const notification: NotificationPayload = {
          requestId: randomInt(1, 999999),
          timestamp: new Date().toISOString(),
          notificationType: "floor.deleted",
          channels: ["in-app", "email"],
          broadcast: false,
          recipient: adminRecipients,
          message: {
            subject: "Floor Deleted",
            body: `The floor "${data.floorId}" has been deleted.`,
            attachments: [],
            pushNotification: {
              title: "Floor Deleted",
              body: `${data.floorId} has been deleted.`,
            },
          },
          schedule: undefined,
          metadata: undefined,
        };
        notificationsService.notify(notification);
      });
}