import { appEmitter } from "../event";
import { NotificationPayload } from "../types/payload";
import { randomInt } from "crypto";
import { notificationsService } from "../notificationsService";
import { AdminService } from "../../accountManagementService/admin.service";
import { NotificationRecipient } from "../notificationListener";

export default function setupNotificationListenersCartography() {
  // Environment notifications
  appEmitter.on("environment.updated", async (data) => {
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
      metadata: undefined,
    };
    notificationsService.notify(notification);
  });

  // Zone notifications
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
        body: `A new zone "${data.zoneName}" has been created by ${data.createdBy} on floor ${data.floorId}.`,
        attachments: [],
        pushNotification: {
          title: "New Zone",
          body: `${data.zoneName} has been created`,
        },
      },
      schedule: undefined,
      metadata: undefined,
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
        body: `Zone "${data.zoneName}" has been updated by ${data.updatedBy}. Changes: ${data.changes}`,
        attachments: [],
        pushNotification: {
          title: "Zone Update",
          body: `${data.zoneName} has been updated`,
        },
      },
      schedule: undefined,
      metadata: undefined,
    };
    notificationsService.notify(notification);
  });

  // Floor notifications
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
        body: `A new floor "${data.floorName}" has been created by ${data.createdBy} in environment ${data.environmentId}.`,
        attachments: [],
        pushNotification: {
          title: "New Floor",
          body: `${data.floorName} has been created`,
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
        body: `Floor "${data.floorName}" has been updated by ${data.updatedBy}. Changes: ${data.changes}`,
        attachments: [],
        pushNotification: {
          title: "Floor Update",
          body: `${data.floorName} has been updated`,
        },
      },
      schedule: undefined,
      metadata: undefined,
    };
    notificationsService.notify(notification);
  });

  // POI notifications
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
        body: `Point of Interest "${data.poiName}" has been updated by ${data.updatedBy}. Changes: ${data.changes}`,
        attachments: [],
        pushNotification: {
          title: "POI Update",
          body: `${data.poiName} has been updated`,
        },
      },
      schedule: undefined,
      metadata: undefined,
    };
    notificationsService.notify(notification);
  });
} 