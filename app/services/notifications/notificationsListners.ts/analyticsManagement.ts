import { appEmitter } from "../event";
import { NotificationPayload } from "../types/payload";
import { NotificationRecipient } from "../notificationListener";
import { randomInt } from "crypto";
import { notificationsService } from "../notificationsService";
import { DeciderService } from "../../accountManagementService/decider.service";

export default function setupNotificationListenersAnalytics(){
    appEmitter.on("analytics.threshold.reached", async (data) => {
        const deciderService=new DeciderService()
        const deciders = await deciderService.getDeciders();
        const deciderRecipients: NotificationRecipient[] = deciders.map(decider => ({
          userId: decider.id,
          email: decider.email,
        }));
    
        const notification: NotificationPayload = {
          requestId: randomInt(1, 999999),
          timestamp: new Date().toISOString(),
          notificationType: "analytics.threshold",
          channels: ["in-app", "email"],
          broadcast: false,
          recipient: deciderRecipients,
          message: {
            subject: `Analytics Alert: ${data.metricName}`,
            body: `The ${data.metricName} metric has ${data.comparison} the threshold of ${data.threshold}. Current value: ${data.currentValue}.`,
            attachments: [],
            pushNotification: {
              title: "Analytics Alert",
              body: `${data.metricName} threshold ${data.comparison}`,
            },
          },
          schedule: undefined,
          metadata:undefined,
           
        };
        notificationsService.notify(notification);
      });
    
      appEmitter.on("report.generated", async (data) => {
        const deciderService=new DeciderService();
        const deciders = await deciderService.getDeciders();
        const deciderRecipients: NotificationRecipient[] = deciders.map(decider => ({
          userId: decider.id,
          email: decider.email,
        }));
    
        const notification: NotificationPayload = {
          requestId: randomInt(1, 999999),
          timestamp: new Date().toISOString(),
          notificationType: "report.generated",
          channels: ["in-app", "email"],
          broadcast: false,
          recipient: deciderRecipients,
          message: {
            subject: `Report Generated: ${data.reportName}`,
            body: `The ${data.reportName} report for period ${data.period} has been generated and is now available for review.`,
            attachments: undefined,
            pushNotification: {
              title: "New Report",
              body: `${data.reportName} is now available`,
            },
          },
          schedule: undefined,
          metadata:undefined,
            
        };
        notificationsService.notify(notification);
      });
}