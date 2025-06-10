import setupNotificationListenersUsers from "./notificationsListners.ts/userManagement";
import setupNotificationListenersDevices from "./notificationsListners.ts/deviceManagement";
import setupNotificationListenersEnvironment from "./notificationsListners.ts/environmentManagement";
import setupNotificationListenersSales from "./notificationsListners.ts/salesManagement";
import setupNotificationListenersMonitoring from "./notificationsListners.ts/monitoringManagement";

// Recipient interface for consistency
export interface NotificationRecipient {
  userId: number;
  userType?: "USER" | "COMMERCIAL" | "ADMIN" | "SUPERADMIN" | "MAINTAINER" | "DECIDER" | "HELPER";
  email: string;
}

function setupNotificationListeners() {
  // 1. USER MANAGEMENT NOTIFICATIONS
  setupNotificationListenersUsers();
  
  // 2. DEVICE MANAGEMENT NOTIFICATIONS
  setupNotificationListenersDevices();

  // 3. NAVIGATION NOTIFICATIONS
  setupNotificationListenersEnvironment();
  
  // 4. MONITORING NOTIFICATIONS
  setupNotificationListenersMonitoring();

  // 5. COMMERCIAL NOTIFICATIONS
  setupNotificationListenersSales();

}

export default setupNotificationListeners;