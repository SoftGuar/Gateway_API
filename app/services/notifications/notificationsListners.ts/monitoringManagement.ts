import { randomInt } from "crypto";
import { notificationsService } from "../notificationsService";
import { AdminService } from "../../accountManagementService/admin.service";
import { NotificationRecipient } from "../notificationListener";
import { appEmitter } from "../event";
import { NotificationPayload } from "../types/payload";
import { DispositiveService } from "../../adminService/dispositive.service";

export default function setupNotificationListenersMonitoring() {
  appEmitter.on("Issue.created", async (issue) => {
    const adminService = new AdminService();
    const admins = await adminService.getAdmins();
    const adminRecipients: NotificationRecipient[] = admins.map((admin) => ({
      userId: admin.id,
      userType: "ADMIN",
      email: admin.email,
    }));

    const notification: NotificationPayload = {
      requestId: randomInt(1, 999999),
      timestamp: new Date().toISOString(),
      notificationType: "Issue.created",
      channels: ["in-app"],
      broadcast: false,
      recipient: adminRecipients,
      message: {
        subject: "New Issue Reported",
        body: `A new issue has been reported in the system. Details: ${issue.description}`,
        attachments: [],
        pushNotification: {
          title: "New Issue",
          body: `Issue reported with ID ${issue.id}`,
        },
      },
      schedule: undefined,
      metadata: undefined,
    };
    notificationsService.notify(notification);
  });
  appEmitter.on("Maintenance.created", async ({ id, maintainerId }) => {
    //assigning DispoIssue to maintainer
    const notification: NotificationPayload = {
      requestId: randomInt(1, 999999),
      timestamp: new Date().toISOString(),
      notificationType: "Maintenance.created",
      channels: ["in-app", "push"],
      broadcast: false,
      recipient: [
        {
          userId: maintainerId,
          userType: "MAINTAINER",
          email: "",
        },
      ],
      message: {
        subject: "New Maintenance Assigned",
        body: `A new maintenance has been assigned to you.`,
        attachments: [],
        pushNotification: {
          title: "New Maintenance",
          body: `Maintenance with ID ${id} has been assigned to you.`,
        },
      },
      schedule: undefined,
      metadata: undefined,
    };
    notificationsService.notify(notification);
  });
  appEmitter.on("Intervention.created", async (data) => {
    //send notif to admins and user
    const adminService = new AdminService();
    const admins = await adminService.getAdmins();
    const adminRecipients: NotificationRecipient[] = admins.map((admin) => ({
      userId: admin.id,
      userType: "ADMIN",
      email: admin.email,
    }));
    const notification: NotificationPayload = {
      requestId: randomInt(1, 999999),
      timestamp: new Date().toISOString(),
      notificationType: "Intervention.created",
      channels: ["in-app", "push"],
      broadcast: false,
      recipient: adminRecipients,
      message: {
        subject: `New Intervention Created: ${data.type}`,
        body: `A new intervention has been created with the following details:
    - Type: ${data.type}
    - Description: ${data.description}
    - Status: ${data.status}
    - Start Date: ${data.start_date}
    - End Date: ${data.end_date}`,
        attachments: [],
        pushNotification: {
          title: "New Intervention",
          body: `Intervention #${data.id} (${data.type}) created.`,
        },
      },
      schedule: undefined,
      metadata: undefined,
    };
    notificationsService.notify(notification);
    // get user owner of the device
    const dispositiveService = new DispositiveService();
    dispositiveService
      .getDispositiveById(data.idDispositive)
      .then((dispositive) => {
        const userId = dispositive.user_id;
        const userNotification: NotificationPayload = {
          requestId: randomInt(1, 999999),
          timestamp: new Date().toISOString(),
          notificationType: "Intervention.created",
          channels: ["in-app", "push"],
          broadcast: false,
          recipient: [
            {
              userId: userId ? userId : NaN,
              userType: "USER",
              email: "",
            },
          ],
          message: {
            subject: "New Intervention Assigned",
            body: `An intervention has been assigned to your device.`,
            attachments: [],
            pushNotification: {
              title: "New Intervention",
              body: `Intervention #${data.id} assigned to your device.`,
            },
          },
          schedule: undefined,
          metadata: undefined,
        };
      });
    notificationsService.notify(notification);
  });
}
