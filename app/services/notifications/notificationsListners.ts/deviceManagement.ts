import { appEmitter } from "../event";
import { NotificationPayload } from "../types/payload";
import { randomInt } from "crypto";
import { notificationsService } from "../notificationsService";
import { AdminService } from "../../accountManagementService/admin.service";
import { DispositiveService } from "../../adminService/dispositive.service";
import { UserService } from "../../accountManagementService/user.service";
import { MaintainerService } from "../../accountManagementService/maintainer.service";
import { NotificationRecipient } from "../notificationListener";

export default function setupNotificationListenersDevices() {
    appEmitter.on("device.registered", async (device) => {
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
          notificationType: "device.registered",
          channels: ["in-app"],
          broadcast: false,
          recipient: adminRecipients,
          message: {
            subject: "New Device Registered",
            body: `A new device (ID: ${device.MAC}, Type: ${device.type}) has been registered in the system.`,
            attachments: [],
            pushNotification: {
              title: "New Device",
              body: `Device ${device.MAC} registered successfully`,
            },
          },
          schedule: undefined,
          metadata:undefined,
        };
        notificationsService.notify(notification);
      });
      
      //********************************************************************************* */
  

    appEmitter.on("device.blocked", async (data) => {
        const deviceService = new DispositiveService();
        const device = await deviceService.getDispositiveById(data.deviceId);

        if (!device) return;

        const userService = new UserService();
        const user = await userService.getUserById(`${device.user_id}`);

        if (!user) return;

        const notification: NotificationPayload = {
            requestId: randomInt(1, 999999),
            timestamp: new Date().toISOString(),
            notificationType: "device.blocked",
            channels: ["in-app", "push", "email"],
            broadcast: false,
            recipient: [
                {
                    userId: user.id,
                    userType: "USER",
                    email: user.email,
                },
            ],
            message: {
                subject: "Device Blocked",
                body: `Your device (${device.id}) has been blocked.`,
                attachments: [],
                pushNotification: {
                    title: "Device Blocked",
                    body: `Device ${device.id} is now blocked.`,
                },
            },
            schedule: undefined,
            metadata: undefined,
        };

        notificationsService.notify(notification);
    });
    }