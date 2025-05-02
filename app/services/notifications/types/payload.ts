export interface NotificationPayload {
    requestId: number;
    timestamp: string;
    notificationType: string;
    channels: Array<"email" | "push" | "in-app">;
    broadcast: boolean;
    recipient: Array<{
        userId: number;
        userType?:"USER" | "COMMERCIAL" | "ADMIN" | "SUPERADMIN" | "MAINTAINER" | "DECIDER" | "HELPER";
        email: string;
    }>;
    message: {
        subject: string;
        body: string;
        attachments?: string[];
        pushNotification?: {
            title: string;
            body: string;
            icon?: string;
            action?: {
                type: string;
                url: string;
            };
        };
    };
    schedule?: {
        sendAt: string;
    };
    metadata?: {
        priority: "low" | "normal" | "high";
        retries: number;
    };
}
