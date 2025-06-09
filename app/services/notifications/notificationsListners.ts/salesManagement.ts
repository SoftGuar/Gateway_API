import { appEmitter } from "../event";
import { CommercialService } from "../../accountManagementService/commercial.service";
import { NotificationPayload } from "../types/payload";
import { NotificationRecipient } from "../notificationListener";
import { randomInt } from "crypto";
import { notificationsService } from "../notificationsService";
import { DispositiveService } from "../../adminService/dispositive.service";
import { UserService } from "../../accountManagementService/user.service";
export default function setupNotificationListenersSales(){
    appEmitter.on("sale.completed", async (data:{
      deviceId: string;
      userId: string; 
    }) => {
        const commercialService = new CommercialService();
        const deviceService = new DispositiveService();
        const device = await deviceService.getDispositiveById(data.deviceId);

        if (!device) return;

        const userService = new UserService();
        const user = await userService.getUserById(data.userId);

        if (!user) return;
        const commercials = await commercialService.getCommercials();
        if (!commercials) return;

        const notification: NotificationPayload = {
            requestId: randomInt(1, 999999),
            timestamp: new Date().toISOString(),
            notificationType: "sale.completed",
            channels: ["in-app", "email", "push"],
            broadcast: false,
            recipient: [
                {
                    userId: user.id,
                    userType: "USER",
                    email: user.email,
                },
            ],
            message: {
                subject: "Sale Completed",
                body: `Sale for device ${device.id} has been completed.`,
                attachments: [],
                pushNotification: {
                    title: "Sale Completed",
                    body: `Sale for device ${device.id} has been completed.`,
                },
            },
            schedule: undefined,
            metadata: undefined,
        };

        notificationsService.notify(notification);
        //notify commercial
        const commercialNotification: NotificationPayload = {
            requestId: randomInt(1, 999999),
            timestamp: new Date().toISOString(),
            notificationType: "sale.completed",
            channels: ["in-app"],
            broadcast: false,
            recipient: [
                ...commercials.map((commercial) => ({
                    userId: commercial.id,
                    userType: "COMMERCIAL" as "COMMERCIAL",
                    email: commercial.email,
                })),
            ],
            message: {
                subject: "Sale Completed",
                body: `Sale for device ${device.id} has been completed by ${user.first_name} ${user.last_name}.`,
                attachments: [],
                pushNotification: {
                    title: "Sale Completed",
                    body: `Sale for device ${device.id} has been completed by ${user.first_name} ${user.last_name}.`,
                },
            },
            schedule: undefined,
            metadata: undefined,
        };
        notificationsService.notify(commercialNotification);
      });
}
