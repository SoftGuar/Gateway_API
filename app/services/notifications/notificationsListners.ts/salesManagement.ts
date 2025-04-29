import { appEmitter } from "../event";
import { CommercialService } from "../../accountManagementService/commercial.service";
import { NotificationPayload } from "../types/payload";
import { NotificationRecipient } from "../notificationListener";
import { randomUUID } from "crypto";
import { notificationsService } from "../notificationsService";
export default function setupNotificationListenersSales(){
    appEmitter.on("sale.completed", async (data) => {
        // Notify commercial team
        const commercialService = new CommercialService();
        const commercialTeam = await commercialService.getCommercials()
        const commercialRecipients: NotificationRecipient[] = commercialTeam.map(member => ({
          userId: member.id,
          email: member.email,
        }));
    
        const notification: NotificationPayload = {
          requestId: randomUUID(),
          timestamp: new Date().toISOString(),
          notificationType: "sale.completed",
          channels: ["in-app", "email"],
          broadcast: false,
          recipient: commercialRecipients,
          message: {
            subject: "New Sale Completed",
            body: `A new sale has been completed for client ${data.clientName}. ${data.quantity} devices sold for a total of ${data.totalAmount}.`,
            attachments: [],
            pushNotification: {
              title: "New Sale",
              body: `${data.quantity} devices sold to ${data.clientName}`,
            },
          },
          schedule: undefined,
          metadata:undefined,
           
        };
        notificationsService.notify(notification);
      });
}
