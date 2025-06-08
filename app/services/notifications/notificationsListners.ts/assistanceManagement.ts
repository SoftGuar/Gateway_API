import { appEmitter } from "../event";
import { NotificationPayload } from "../types/payload";
import { randomInt } from "crypto";
import { notificationsService } from "../notificationsService";
import { DispositiveService } from "../../adminService/dispositive.service";
import { UserService } from "../../accountManagementService/user.service";
import { MaintainerService } from "../../accountManagementService/maintainer.service";
import { NotificationRecipient } from "../notificationListener";

export default function setupNotificationListenersAssistance() {
    appEmitter.on("assistance.emergency", async (data:{
        userId: string;
        location: string;
    }) => {
        // Get user info
        const userService = new UserService();
        const user = await userService.getUserById(data.userId);
        
        if (!user) return;
        
        // Get all aidants
        const aidantService = new UserService(); // Assuming aidants are managed by UserService
        const aidants = await aidantService.getUserHelpers(data.userId);
        const aidantRecipients: NotificationRecipient[] = aidants.map(aidant => ({
          userId: aidant.id,
          email: aidant.email,
        }));
    
        // Notify all aidants about the emergency
        const notification: NotificationPayload = {
          requestId: randomInt(1, 999999),
          timestamp: new Date().toISOString(),
          notificationType: "assistance.emergency",
          channels: ["in-app", "email"],
          broadcast: false,
          recipient: aidantRecipients,
          message: {
            subject: "EMERGENCY ASSISTANCE NEEDED",
            body: `User ${user.first_name} ${user.last_name} has triggered an emergency alert at ${data.location}. Immediate assistance required.`,
            attachments: [],
            pushNotification: {
              title: "EMERGENCY ALERT",
              body: `${user.first_name} ${user.last_name} needs immediate assistance!`,
            },
          },
          schedule: undefined,
          metadata: undefined,
        };
        notificationsService.notify(notification);
      });
    
      appEmitter.on("assistance.request", async (data) => {
        // Get user info
        const userService = new UserService();
        const user = await userService.getUserById(data.userId);
        
        if (!user) return;
        
        // If specific aidant requested
        if (data.aidantId) {
          const aidant = await userService.getUserById(data.aidantId);
          
          if (!aidant) return;
          
          const notification: NotificationPayload = {
            requestId: randomInt(1, 999999),
            timestamp: new Date().toISOString(),
            notificationType: "assistance.request",
            channels: ["in-app", "email"],
            broadcast: false,
            recipient: [{
              userId: aidant.id,
              email: aidant.email
            }],
            message: {
              subject: "Assistance Request",
              body: `User ${user.first_name} ${user.last_name} has requested your assistance. Location: ${data.location}`,
              attachments: [],
              pushNotification: {
                title: "Assistance Needed",
                body: `${user.first_name} ${user.last_name} needs your help`,
              },
            },
            schedule: undefined,
            metadata:undefined,
          };
          notificationsService.notify(notification);
        } else {
          // Notify all available aidants
          const aidantService = new UserService();
          const aidants = await aidantService.getUserHelpers(`${user.id}`)
          const aidantRecipients: NotificationRecipient[] = aidants.map(aidant => ({
            userId: aidant.id,
            email: aidant.email,
          }));
    
          const notification: NotificationPayload = {
            requestId: randomInt(1, 999999),
            timestamp: new Date().toISOString(),
            notificationType: "assistance.request.broadcast",
            channels: ["in-app"],
            broadcast: false,
            recipient: aidantRecipients,
            message: {
              subject: "Assistance Request",
              body: `User ${user.first_name} ${user.last_name} has requested assistance. Location: ${data.location}`,
              attachments: [],
              pushNotification: {
                title: "Assistance Request",
                body: `${user.first_name} ${user.last_name} needs assistance`,
              },
            },
            schedule: undefined,
            metadata:undefined,
          };
          notificationsService.notify(notification);
        }
    
        // Confirmation to user
        const confirmationNotification: NotificationPayload = {
          requestId: randomInt(1, 999999),
          timestamp: new Date().toISOString(),
          notificationType: "assistance.request.confirmation",
          channels: ["in-app"],
          broadcast: false,
          recipient: [{
            userId: user.id,
            email:user.email
          }],
          message: {
            subject: "Assistance Request Sent",
            body: `Your request for assistance has been sent. An aidant will respond shortly.`,
            attachments: [],
            pushNotification: {
              title: "Request Sent",
              body: "Help is on the way",
            },
          },
          schedule: undefined,
          metadata: undefined,
        };
        notificationsService.notify(confirmationNotification);
      });
    
      // 5. MAINTENANCE NOTIFICATIONS
      appEmitter.on("maintenance.scheduled", async (data) => {
        // Notify maintenance staff
        const maintenanceService = new MaintainerService()
        const maintenanceStaff = await maintenanceService.getMaintainers();
        const maintenanceRecipients: NotificationRecipient[] = maintenanceStaff.map(staff => ({
          userId: staff.id,
          email: staff.email,
        }));
    
        const notification: NotificationPayload = {
          requestId: randomInt(1, 999999),
          timestamp: new Date().toISOString(),
          notificationType: "maintenance.scheduled",
          channels: ["in-app", "email"],
          broadcast: false,
          recipient: maintenanceRecipients,
          message: {
            subject: "Maintenance Task Scheduled",
            body: `New maintenance task scheduled for device ${data.deviceId} on ${new Date(data.scheduledDate).toLocaleDateString()}. ${data.description}`,
            attachments: [],
            pushNotification: {
              title: "New Maintenance Task",
              body: `Device ${data.deviceId} needs maintenance`,
            },
          },
          schedule: undefined,
          metadata:undefined,
        };
        notificationsService.notify(notification);
    
        // If device is assigned to a user, notify them as well
        const deviceService = new DispositiveService();
        const device = await deviceService.getDispositiveById(data.deviceId);
        
        if (device && device.user_id) {
          const userService = new UserService();
          const user = await userService.getUserById(`${device.user_id}`);
          
          if (user) {
            const userNotification: NotificationPayload = {
              requestId: randomInt(1, 999999),
              timestamp: new Date().toISOString(),
              notificationType: "maintenance.scheduled.user",
              channels: ["in-app", "email"],
              broadcast: false,
              recipient: [{
                userId: user.id,
                email: user.email
              }],
              message: {
                subject: "Device Maintenance Scheduled",
                body: `Maintenance for your device has been scheduled for ${new Date(data.scheduledDate).toLocaleDateString()}. ${data.userMessage || ''}`,
                attachments: [],
                pushNotification: {
                  title: "Scheduled Maintenance",
                  body: `Your device needs maintenance on ${new Date(data.scheduledDate).toLocaleDateString()}`,
                },
              },
              schedule: undefined,
              metadata:undefined,
                
            };
            notificationsService.notify(userNotification);
          }
        }
      });
    }