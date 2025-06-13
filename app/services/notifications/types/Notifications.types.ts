export interface createNotificationInput {
    user_id: number;
    user_type: "USER" | "COMMERCIAL" | "ADMIN" | "SUPERADMIN" | "MAINTAINER" | "DECIDER" | "HELPER";
    title: string;
    message: string;
    read: boolean;
    type?: string;
    metadata?: Record<string, any>;
    sentAt?: Date;
    readAt?: Date;
}
export interface updateNotificationInput {
    title?: string;
    message?: string;
    read?: boolean;
    type?: string;
    metadata?: Record<string, any>;
}
