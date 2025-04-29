
import { appEmitter } from "../event";
import { NotificationPayload } from "../types/payload";
import { randomUUID } from "crypto";
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
          email: admin.email,
        }));
    
        const notification: NotificationPayload = {
          requestId: randomUUID(),
          timestamp: new Date().toISOString(),
          notificationType: "device.registered",
          channels: ["email", "in-app"],
          broadcast: false,
          recipient: adminRecipients,
          message: {
            subject: "New Device Registered",
            body: `A new device (ID: ${device.id}, Type: ${device.type}) has been registered in the system.`,
            attachments: [],
            pushNotification: {
              title: "New Device",
              body: `Device ${device.id} registered successfully`,
            },
          },
          schedule: undefined,
          metadata:undefined,
        };
        notificationsService.notify(notification);
      });
      
      //********************************************************************************* */
    
      appEmitter.on("device.battery.low", async (data) => {
        const deviceService = new DispositiveService();
        const device = await deviceService.getDispositiveById(data.deviceId);
        
        if (!device || !device.user_id) return;
    
        const userService = new UserService();
        const user = await userService.getUserById(`${device.user_id}`);
        
        if (!user) return;
    
        // Notification to user
        const userNotification: NotificationPayload = {
          requestId: randomUUID(),
          timestamp: new Date().toISOString(),
          notificationType: "device.battery.low",
          channels: ["in-app"],
          broadcast: false,
          recipient: [{
            userId: user.id,
            email: user.email
          }],
          message: {
            subject: "Low Battery Warning",
            body: `Your device battery is at ${data.batteryLevel}%. Please charge your device soon.`,
            attachments: [],
            pushNotification: {
              title: "Low Battery",
              body: `Battery at ${data.batteryLevel}%. Please charge soon.`,
            },
          },
          schedule: undefined,
          metadata: undefined,
        };
        notificationsService.notify(userNotification);
    
        // If battery critically low, also notify maintenance staff
        if (data.batteryLevel <= 10) {
          const maintenanceService = new MaintainerService()
          const maintenanceStaff = await maintenanceService.getMaintainers();
          const maintenanceRecipients: NotificationRecipient[] = maintenanceStaff.map(staff => ({
            userId: staff.id,
            email: staff.email,
          }));
    
          const criticalNotification: NotificationPayload = {
            requestId: randomUUID(),
            timestamp: new Date().toISOString(),
            notificationType: "device.battery.critical",
            channels: ["in-app"],
            broadcast: false,
            recipient: maintenanceRecipients,
            message: {
              subject: "Critical Battery Level",
              body: `Device ${data.deviceId} (User: ${user.first_name} ${user.last_name}) battery critically low at ${data.batteryLevel}%.`,
              attachments: [],
              pushNotification: {
                title: "Critical Battery Alert",
                body: `Device ${data.deviceId} battery at ${data.batteryLevel}%`,
              },
            },
            schedule: undefined,
            metadata:undefined,
          };
          notificationsService.notify(criticalNotification);
        }
      });
    appEmitter.on("device.assigned", async (data) => {
        const deviceService = new DispositiveService();
        const device = await deviceService.getDispositiveById(data.deviceId);

        if (!device) return;

        const userService = new UserService();
        const user = await userService.getUserById(data.userId);

        if (!user) return;

        const notification: NotificationPayload = {
            requestId: randomUUID(),
            timestamp: new Date().toISOString(),
            notificationType: "device.assigned",
            channels: ["in-app", "email"],
            broadcast: false,
            recipient: [
                {
                    userId: user.id,
                    email: user.email,
                },
            ],
            message: {
                subject: "Device Assigned",
                body: `Device ${device.id} has been assigned to you.`,
                attachments: [],
                pushNotification: {
                    title: "Device Assigned",
                    body: `Device ${device.id} is now assigned to you.`,
                },
            },
            schedule: undefined,
            metadata: undefined,
        };

        notificationsService.notify(notification);
    });

    appEmitter.on("device.blocked", async (data) => {
        const deviceService = new DispositiveService();
        const device = await deviceService.getDispositiveById(data.deviceId);

        if (!device) return;

        const userService = new UserService();
        const user = await userService.getUserById(`${device.user_id}`);

        if (!user) return;

        const notification: NotificationPayload = {
            requestId: randomUUID(),
            timestamp: new Date().toISOString(),
            notificationType: "device.blocked",
            channels: ["in-app", "email"],
            broadcast: false,
            recipient: [
                {
                    userId: user.id,
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