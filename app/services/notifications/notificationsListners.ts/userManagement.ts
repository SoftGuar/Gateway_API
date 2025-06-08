import { appEmitter } from "../event";
import { NotificationPayload } from "../types/payload";
import { randomInt } from "crypto";
import { notificationsService } from "../notificationsService";
import { AdminService } from "../../accountManagementService/admin.service";
import { NotificationRecipient } from "../notificationListener";

export interface Receiver {
    id?: number;
    email: string;
    name: string;
    type?: string;
}

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
                    email: user.email,
                },
            ],
            message: {
                subject: `Welcome ${user.name}!`,
                body: `Hello ${user.name},\n\nWelcome to our platform! We're excited to have you on board.\n\nTo get started, please verify your email address and complete your profile setup.\n\nBest regards,\nThe Team`,
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
            email: admin.email,
        }));
    
        const notification2: NotificationPayload = {
            requestId: randomInt(1, 999999),
            timestamp: new Date().toISOString(),
            notificationType: "user.created",
            channels: ["push", "in-app"],
            broadcast: false,
            recipient: adminRecipients,
            message: {
                subject: `New ${user.type} Registration`,
                body: `User ${user.name} (${user.email}) has been successfully registered.\n\nPlease review their account and take necessary actions if required.`,
                attachments: [],
                pushNotification: {
                    title: `New ${user.type} Registration`,
                    body: `${user.name} has joined the platform`,
                },
            },
            schedule: undefined,
            metadata: undefined,
        };
        await notificationsService.notify(notification2);
    });

    // Profile Update Notification
    appEmitter.on("user.profile.updated", async (data: { user: Receiver, changes: string[] }) => {
        const notification: NotificationPayload = {
            requestId: randomInt(1, 999999),
            timestamp: new Date().toISOString(),
            notificationType: "user.profile.updated",
            channels: ["email", "in-app"],
            broadcast: false,
            recipient: [
                {
                    userId: data.user.id ? data.user.id : NaN,
                    email: data.user.email,
                },
            ],
            message: {
                subject: "Profile Update Confirmation",
                body: `Hello ${data.user.name},\n\nYour profile has been successfully updated with the following changes:\n${data.changes.join('\n')}\n\nIf you didn't make these changes, please contact support immediately.`,
                attachments: [],
                pushNotification: {
                    title: "Profile Updated",
                    body: "Your profile has been successfully updated",
                },
            },
            schedule: undefined,
            metadata: undefined,
        };
        await notificationsService.notify(notification);
    });

    // Password Change Notification
    appEmitter.on("user.password.changed", async (user: Receiver) => {
        const notification: NotificationPayload = {
            requestId: randomInt(1, 999999),
            timestamp: new Date().toISOString(),
            notificationType: "user.password.changed",
            channels: ["email"],
            broadcast: false,
            recipient: [
                {
                    userId: user.id ? user.id : NaN,
                    email: user.email,
                },
            ],
            message: {
                subject: "Password Change Confirmation",
                body: `Hello ${user.name},\n\nYour password has been successfully changed.\n\nIf you didn't make this change, please contact support immediately.\n\nBest regards,\nThe Security Team`,
                attachments: [],
                pushNotification: undefined,
            },
            schedule: undefined,
            metadata: undefined,
        };
        await notificationsService.notify(notification);
    });

    // Account Status Change Notification
    appEmitter.on("user.status.changed", async (data: { user: Receiver, newStatus: string, reason?: string }) => {
        const notification: NotificationPayload = {
            requestId: randomInt(1, 999999),
            timestamp: new Date().toISOString(),
            notificationType: "user.status.changed",
            channels: ["email", "in-app"],
            broadcast: false,
            recipient: [
                {
                    userId: data.user.id ? data.user.id : NaN,
                    email: data.user.email,
                },
            ],
            message: {
                subject: `Account Status Update: ${data.newStatus}`,
                body: `Hello ${data.user.name},\n\nYour account status has been changed to: ${data.newStatus}\n${data.reason ? `\nReason: ${data.reason}` : ''}\n\nIf you have any questions, please contact support.\n\nBest regards,\nThe Team`,
                attachments: [],
                pushNotification: {
                    title: "Account Status Update",
                    body: `Your account is now ${data.newStatus}`,
                },
            },
            schedule: undefined,
            metadata: undefined,
        };
        await notificationsService.notify(notification);
    });

    // Failed Login Attempt Notification
    appEmitter.on("user.login.failed", async (data: { user: Receiver, attempts: number, ipAddress: string }) => {
        if (data.attempts >= 3) {
            const notification: NotificationPayload = {
                requestId: randomInt(1, 999999),
                timestamp: new Date().toISOString(),
                notificationType: "user.login.failed",
                channels: ["email"],
                broadcast: false,
                recipient: [
                    {
                        userId: data.user.id ? data.user.id : NaN,
                        email: data.user.email,
                    },
                ],
                message: {
                    subject: "Multiple Failed Login Attempts",
                    body: `Hello ${data.user.name},\n\nWe detected ${data.attempts} failed login attempts to your account from IP: ${data.ipAddress}.\n\nIf this wasn't you, please secure your account immediately.\n\nBest regards,\nThe Security Team`,
                    attachments: [],
                    pushNotification: undefined,
                },
                schedule: undefined,
                metadata: undefined,
            };
            await notificationsService.notify(notification);
        }
    });
}