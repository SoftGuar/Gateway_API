import { appEmitter } from "../event";
import { NotificationPayload } from "../types/payload";
import { randomInt } from "crypto";
import { notificationsService } from "../notificationsService";
import { AdminService } from "../../accountManagementService/admin.service";
import { NotificationRecipient } from "../notificationListener";
import { UserService } from "../../accountManagementService/user.service";
import { HelperService } from "../../accountManagementService/helper.service";

export interface Receiver {
    id?: number;
    email?: string;
    name: string;
    type?: string;
}

// HTML Templates
const WELCOME_EMAIL_TEMPLATE = (name: string) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { padding: 20px; background-color: #fff; border-left: 1px solid #ddd; border-right: 1px solid #ddd; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #777; background-color: #f8f9fa; border-radius: 0 0 5px 5px; border: 1px solid #ddd; }
        .button { display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Welcome to Our Platform!</h1>
    </div>
    <div class="content">
        <p>Hello ${name},</p>
        <p>We're excited to have you on board! Our platform is designed to help you achieve your goals.</p>
        <p>If you have any questions, don't hesitate to contact our support team.</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Our Company. All rights reserved.</p>
        <p>If you didn't request this account, please ignore this email.</p>
    </div>
</body>
</html>
`;

const PROFILE_UPDATE_TEMPLATE = (name: string) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { padding: 20px; background-color: #fff; border-left: 1px solid #ddd; border-right: 1px solid #ddd; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #777; background-color: #f8f9fa; border-radius: 0 0 5px 5px; border: 1px solid #ddd; }
        .changes { margin: 15px 0; padding: 10px; background-color: #f1f1f1; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Your Profile Has Been Updated</h1>
    </div>
    <div class="content">
        <p>Hello ${name},</p>
        <p>Your profile has been successfully updated.</p>
        <p>If you didn't make changes, please contact our support team immediately.</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Our Company. All rights reserved.</p>
        <p><a href="#">Visit our support center</a> for any questions.</p>
    </div>
</body>
</html>
`;

const ADMIN_NOTIFICATION_TEMPLATE = (userName: string, userEmail: string, userType?: string) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { padding: 20px; background-color: #fff; border-left: 1px solid #ddd; border-right: 1px solid #ddd; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #777; background-color: #f8f9fa; border-radius: 0 0 5px 5px; border: 1px solid #ddd; }
        .info { margin: 15px 0; padding: 10px; background-color: #e7f4ff; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>New ${userType || 'User'} Registration</h1>
    </div>
    <div class="content">
        <p>Hello Admin,</p>
        <div class="info">
            <p><strong>Name:</strong> ${userName}</p>
            <p><strong>Email:</strong> ${userEmail}</p>
            <p><strong>Type:</strong> ${userType || 'Regular User'}</p>
        </div>
        <p>This user has been successfully registered in the system.</p>
        <p>Please review their account and take necessary actions if required.</p>
    </div>
    <div class="footer">
        <p>© ${new Date().getFullYear()} Our Company. All rights reserved.</p>
        <p><a href="#">Go to Admin Dashboard</a></p>
    </div>
</body>
</html>
`;

export default function setupNotificationListenersUsers() {
    // User Creation Notification
    appEmitter.on("user.created", async (user: Receiver) => {
        // Send welcome email to the user
        const notification1: NotificationPayload = {
            requestId: randomInt(1, 999999),
            timestamp: new Date().toISOString(),
            notificationType: "user.created",
            channels: ["email"],
            broadcast: false,
            recipient: [
                {
                    userId: NaN,
                    userType: "USER",
                    email: user.email? user.email : "",
                },
            ],
            message: {
                subject: `Welcome ${user.name}!`,
                body: WELCOME_EMAIL_TEMPLATE(user.name),
                attachments: [],
                pushNotification: undefined,
            },
            schedule: undefined,
            metadata: undefined,
        };
        await notificationsService.notify(notification1);
        
        // Notify admins
        const adminService = new AdminService();
        const admins = await adminService.getAdmins();
        const adminRecipients: NotificationRecipient[] = admins.map(admin => ({
            userId: admin.id,
            userType: "ADMIN",
            email: admin.email,
        }));
    
        const notification2: NotificationPayload = {
            requestId: randomInt(1, 999999),
            timestamp: new Date().toISOString(),
            notificationType: "user.created",
            channels: ["email", "in-app"],
            broadcast: false,
            recipient: adminRecipients,
            message: {
                subject: `New ${user.type || 'User'} Registration`,
                body: ADMIN_NOTIFICATION_TEMPLATE(user.name, user.email ? user.email : "", user.type),
                attachments: [],
                pushNotification: {
                    title: `New ${user.type || 'User'} Registration`,
                    body: `${user.name} has joined the platform`,
                },
            },
            schedule: undefined,
            metadata: undefined,
        };
        await notificationsService.notify(notification2);
    });

    // Profile Update Notification
    appEmitter.on("user.profile.updated", async (data: { user: Receiver }) => {
        const userType : "USER" | "ADMIN"|"MAINTAINER"|"HELPER"|"COMMERCIAL"|"DECIDER" = (data.user.type)?.toUpperCase() as "USER" | "ADMIN"|"MAINTAINER"|"HELPER"|"COMMERCIAL"|"DECIDER"
        const userService = new UserService();
        const user = await userService.getUserById(data.user.id?.toString() || "");
        if (!user) {
            console.error("User not found for profile update notification");
            return;
        }
        // Notify the user about their profile update
        const notification: NotificationPayload = {
            requestId: randomInt(1, 999999),
            timestamp: new Date().toISOString(),
            notificationType: "user.profile.updated",
            channels: ["email", "in-app"],
            broadcast: false,
            recipient: [
                {
                    userId: data.user.id ? data.user.id : NaN,
                    email: user.email,
                    userType: userType,
                },
            ],
            message: {
                subject: "Profile Update Confirmation",
                body: PROFILE_UPDATE_TEMPLATE(`${user.last_name} ${user.first_name}`),
                attachments: [],
                pushNotification: {
                    title: "Profile Updated",
                    body: "Your profile has been successfully updated",
                },
            },
            schedule: undefined,
            metadata: {
                retries: 0,
                priority: "normal",
            },
        };
        await notificationsService.notify(notification);
    });

    //Helper added for user 
    appEmitter.on("user.helper.added", async (data: { user: Receiver, helper: Receiver }) => {
        const userType : "USER" | "ADMIN"|"MAINTAINER"|"HELPER"|"COMMERCIAL"|"DECIDER" = (data.user.type)?.toUpperCase() as "USER" | "ADMIN"|"MAINTAINER"|"HELPER"|"COMMERCIAL"|"DECIDER"
        const userService = new UserService();
        const user = await userService.getUserById(data.user.id?.toString() || "");
        if (!user) {
            console.error("User not found for helper added notification");
            return;
        }
        // Notify the user about their helper being added
        const notification: NotificationPayload = {
            requestId: randomInt(1, 999999),
            timestamp: new Date().toISOString(),
            notificationType: "user.helper.added",
            channels: ["email", "in-app", "push"],
            broadcast: false,
            recipient: [
                {
                    userId: data.user.id ? data.user.id : NaN,
                    email: user.email,
                    userType: userType,
                },
            ],
            message: {
                subject: "Helper Added",
                body: `<p>Hello ${user.last_name} ${user.first_name},</p>
                       <p>${data.helper.name} has been added as your helper.</p>
                       <p>Best regards,</p>
                       <p>Your Team</p>`,
                attachments: [],
                pushNotification: {
                    title: "Helper Added",
                    body: `${data.helper.name} has been added as your helper`,
                },
            },
            schedule: undefined,
            metadata: {
                retries: 0,
                priority: "normal",
            },
        };
        await notificationsService.notify(notification);
        // Notify the helper about being added
        const helperService = new HelperService();
        const helper = await helperService.getHelperById(data.helper.id?.toString() || "");
        if (!helper) {
            console.error("Helper not found for helper added notification");
            return;
        }
        const helperNotification: NotificationPayload = {
            requestId: randomInt(1, 999999),
            timestamp: new Date().toISOString(),
            notificationType: "user.helper.added",
            channels: ["email", "in-app", "push"],
            broadcast: false,
            recipient: [
                {
                    userId: data.helper.id ? data.helper.id : NaN,
                    email: helper.email,
                    userType: "HELPER",
                },
            ],
            message: {
                subject: "You Have Been Added as a Helper",
                body: `<p>Hello ${helper.first_name} ${helper.last_name},</p>
                       <p>You have been added as a helper for ${user.last_name} ${user.first_name}.</p>
                       <p>Best regards,</p>
                       <p>Your Team</p>`,
                attachments: [],
                pushNotification: {
                    title: "Helper Role Assigned",
                    body: `You are now a helper for ${user.last_name} ${user.first_name}`,
                },
            },
            schedule: undefined,
            metadata: {
                retries: 0,
                priority: "normal",
            },
        };
        await notificationsService.notify(helperNotification);
    });
}