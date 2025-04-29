import { appEmitter } from "../event";
import { NotificationPayload } from "../types/payload";
import { randomUUID } from "crypto";
import { notificationsService } from "../notificationsService";
import { AdminService } from "../../accountManagementService/admin.service";
import { NotificationRecipient } from "../notificationListener";

export interface Receiver {
    id: number;
    email: string;
    name: string;}
export default function setupNotificationListenersUsers(){
    appEmitter.on("user.created", async (user:Receiver) => {
        // Send email to the user
        const notification1: NotificationPayload = {
          requestId: randomUUID(),
          timestamp: new Date().toISOString(),
          notificationType: "user.created",
          channels: ["email"],
          broadcast: false,
          recipient: [
            {
              userId: user.id,
              email: user.email,
            },
          ],
          message: {
            subject: `Welcome ${user.name}!`,
            body: `Hello ${user.name}, welcome to our platform!`,
            attachments: [],
            pushNotification: undefined,
          },
          schedule: undefined,
          metadata: undefined,
        };
        notificationsService.notify(notification1).then(() => {
          console.log(`Notification sent to ${user.email} for user creation`);
        });
        
        // Send notification to the admin in-app and email
        const adminService = new AdminService();
        const admins = await adminService.getAdmins();
        const adminRecipients: NotificationRecipient[] = admins.map(admin => ({
          userId: admin.id,
          email: admin.email,
        }));
    
        const notification2: NotificationPayload = {
          requestId: randomUUID(),
          timestamp: new Date().toISOString(),
          notificationType: "user.created",
          channels: ["email", "in-app"],
          broadcast: false,
          recipient: adminRecipients,
          message: {
            subject: `New User Registration`,
            body: `User ${user.name} has been successfully registered`,
            attachments: [],
            pushNotification: {
              title: "New User",
              body: `${user.name} has joined the platform`,
            },
          },
          schedule: undefined,
          metadata: undefined,
        };
        notificationsService.notify(notification2);
      });
}