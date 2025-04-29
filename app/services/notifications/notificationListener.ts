import { appEmitter } from "./event";
import { NotificationPayload } from "./types/payload";
import { randomUUID } from "crypto";
import { notificationsService } from "./notificationsService";
import { AdminService } from "../accountManagementService/admin.service";
import { DispositiveService } from "../adminService/dispositive.service";
import { UserService } from "../accountManagementService/user.service";
import { MaintainerService } from "../accountManagementService/maintainer.service";
import { CommercialService } from "../accountManagementService/commercial.service";
import { DeciderService } from "../accountManagementService/decider.service";

// Recipient interface for consistency
interface NotificationRecipient {
  userId: number;
  email: string;
}

function setupNotificationListeners() {
  // 1. USER MANAGEMENT NOTIFICATIONS
  appEmitter.on("user.created", async (user) => {
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

  //********************************************************************************* */
  //********************************************************************************* */
  // 2. DEVICE MANAGEMENT NOTIFICATIONS
  //********************************************************************************* */
  //********************************************************************************* */

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

  appEmitter.on("device.status.changed", async (data) => {
    const deviceService = new DispositiveService();
    const device = await deviceService.getDispositiveById(data.deviceId);
    
    if (!device) return;

    // Get the user associated with the device
    let userRecipient: NotificationRecipient[] = [];
    if (device.user_id) {
      const userService = new UserService();
      const user = await userService.getUserById(`${device.user_id}`);
      if (user) {
        userRecipient.push({
          userId: user.id,
          email: user.email
        });
      }
    }

    // Notify user about the device status change
    if (userRecipient.length > 0) {
      const notification: NotificationPayload = {
        requestId: randomUUID(),
        timestamp: new Date().toISOString(),
        notificationType: "device.status.changed",
        channels: ["in-app", "email","push"],
        broadcast: false,
        recipient: userRecipient,
        message: {
          subject: "Device Status Changed",
          body: `Your device (${device.id}) status has changed to: ${data.newStatus}`,
          attachments: [],
          pushNotification: {
            title: "Device Status Update",
            body: `Your device is now ${data.newStatus}`,
          },
        },
        schedule: undefined,
        metadata: undefined,
      };
      notificationsService.notify(notification);
    }

    // Notify admins and maintenance staff for critical status changes
    if (["ERROR", "MAINTENANCE_REQUIRED", "DISCONNECTED"].includes(data.newStatus)) {
      const adminService = new AdminService();
      const admins = await adminService.getAdmins();
      const adminRecipients: NotificationRecipient[] = admins.map(admin => ({
        userId: admin.id,
        email: admin.email,
      }));

      // Get maintenance staff
      const maintenanceService = new MaintainerService();
      const maintenanceStaff = await maintenanceService.getMaintainers();
      const maintenanceRecipients: NotificationRecipient[] = maintenanceStaff.map(staff => ({
        userId: staff.id,
        email: staff.email,
      }));

      // Combine recipients
      const allRecipients = [...adminRecipients, ...maintenanceRecipients];

      const notification: NotificationPayload = {
        requestId: randomUUID(),
        timestamp: new Date().toISOString(),
        notificationType: "device.status.critical",
        channels: ["in-app", "email"],
        broadcast: false,
        recipient: allRecipients,
        message: {
          subject: "Critical Device Status Change",
          body: `Device ${device.id} (User: ${device.user_id || 'Unassigned'}) status changed to ${data.newStatus}. Immediate attention required.`,
          attachments: [],
          pushNotification: {
            title: "Device Alert",
            body: `Device ${device.id} is now ${data.newStatus}`,
          },
        },
        schedule: undefined,
        metadata: undefined,
      };
      notificationsService.notify(notification);
    }
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

  // 3. NAVIGATION NOTIFICATIONS
  appEmitter.on("navigation.obstacle.detected", async (data) => {
    if (!data.userId) return;

    const notification: NotificationPayload = {
      requestId: randomUUID(),
      timestamp: new Date().toISOString(),
      notificationType: "navigation.obstacle",
      channels: ["in-app"],
      broadcast: false,
      recipient: [{
        userId: data.userId,
        email: data.email
      }],
      message: {
        subject: "Obstacle Alert",
        body: `Obstacle detected ${data.distance}m ahead. Route recalculation in progress.`,
        attachments: [],
        pushNotification: {
          title: "Obstacle Ahead",
          body: `Obstacle detected. Recalculating route.`,
        },
      },
      schedule: undefined,
      metadata:undefined,
    };
    notificationsService.notify(notification);
  });

  appEmitter.on("navigation.destination.reached", async (data) => {
    const notification: NotificationPayload = {
      requestId: randomUUID(),
      timestamp: new Date().toISOString(),
      notificationType: "navigation.destination",
      channels: ["in-app"],
      broadcast: false,
      recipient: [{
        userId: data.userId,
        email: data.mail
      }],
      message: {
        subject: "Destination Reached",
        body: `You have reached your destination: ${data.destinationName}`,
        attachments: [],
        pushNotification: {
          title: "Arrived",
          body: `You have reached ${data.destinationName}`,
        },
      },
      schedule: undefined,
      metadata:undefined,
    };
    notificationsService.notify(notification);
  });

  appEmitter.on("navigation.zone.entered", async (data) => {
    // Notification for user entering a zone
    const notification: NotificationPayload = {
      requestId: randomUUID(),
      timestamp: new Date().toISOString(),
      notificationType: "navigation.zone",
      channels: ["in-app"],
      broadcast: false,
      recipient: [{
        userId: data.userId,
        email:data.email
      }],
      message: {
        subject: "Zone Notification",
        body: `You have entered the ${data.zoneName} zone.`,
        attachments: [],
        pushNotification: {
          title: "Zone Change",
          body: `Now in ${data.zoneName} zone`,
        },
      },
      schedule: undefined,
      metadata: undefined,
    };
    notificationsService.notify(notification);

    // Special notification for danger zones
    if (data.zoneType === "DANGER") {
      const dangerNotification: NotificationPayload = {
        requestId: randomUUID(),
        timestamp: new Date().toISOString(),
        notificationType: "navigation.zone.danger",
        channels: ["in-app"],
        broadcast: false,
        recipient: [{
          userId: data.userId,
          email:data.email
        }],
        message: {
          subject: "CAUTION: Danger Zone",
          body: `You have entered a DANGER zone. Please proceed with extreme caution or consider an alternative route.`,
          attachments: [],
          pushNotification: {
            title: "⚠️ DANGER ZONE ⚠️",
            body: `Exercise extreme caution!`,
          },
        },
        schedule: undefined,
        metadata:undefined,
      };
      notificationsService.notify(dangerNotification);
    }
  });

  // 4. ASSISTANCE NOTIFICATIONS
  appEmitter.on("assistance.emergency", async (data) => {
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
      requestId: randomUUID(),
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
        requestId: randomUUID(),
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
        requestId: randomUUID(),
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
      requestId: randomUUID(),
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
      requestId: randomUUID(),
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
          requestId: randomUUID(),
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

  // 6. ENVIRONMENT & POI NOTIFICATIONS
  appEmitter.on("environment.updated", async (data) => {
    const adminService = new AdminService();
    const admins = await adminService.getAdmins();
    const adminRecipients: NotificationRecipient[] = admins.map(admin => ({
      userId: admin.id,
      email: admin.email,
    }));

    const notification: NotificationPayload = {
      requestId: randomUUID(),
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
      metadata:undefined,
       
    };
    notificationsService.notify(notification);
  });

  appEmitter.on("poi.created", async (data) => {
    const adminService = new AdminService();
    const admins = await adminService.getAdmins();
    const adminRecipients: NotificationRecipient[] = admins.map(admin => ({
      userId: admin.id,
      email: admin.email,
    }));

    const notification: NotificationPayload = {
      requestId: randomUUID(),
      timestamp: new Date().toISOString(),
      notificationType: "poi.created",
      channels: ["in-app"],
      broadcast: false,
      recipient: adminRecipients,
      message: {
        subject: "New POI Created",
        body: `New Point of Interest "${data.poiName}" (Category: ${data.category}) has been added to environment "${data.environmentName}" by ${data.createdBy}.`,
        attachments: [],
        pushNotification: {
          title: "New POI",
          body: `${data.poiName} added to ${data.environmentName}`,
        },
      },
      schedule: undefined,
      metadata:undefined,
        
    };
    notificationsService.notify(notification);
  });

  // 7. COMMERCIAL NOTIFICATIONS
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

  // 8. ANALYTICS NOTIFICATIONS
  appEmitter.on("analytics.threshold.reached", async (data) => {
    const deciderService=new DeciderService()
    const deciders = await deciderService.getDeciders();
    const deciderRecipients: NotificationRecipient[] = deciders.map(decider => ({
      userId: decider.id,
      email: decider.email,
    }));

    const notification: NotificationPayload = {
      requestId: randomUUID(),
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
      requestId: randomUUID(),
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

export default setupNotificationListeners;