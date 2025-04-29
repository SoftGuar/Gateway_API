import setupNotificationListenersUsers from "./notificationsListners.ts/userManagement";
import setupNotificationListenersDevices from "./notificationsListners.ts/deviceManagement";
import setupNotificationListenersEnvironment from "./notificationsListners.ts/environmentManagement";
import setupNotificationListenersAssistance from "./notificationsListners.ts/assistanceManagement";
import setupNotificationListenersSales from "./notificationsListners.ts/salesManagement";
import setupNotificationListenersAnalytics from "./notificationsListners.ts/analyticsManagement";

// Recipient interface for consistency
export interface NotificationRecipient {
  userId: number;
  email: string;
}

function setupNotificationListeners() {
  // 1. USER MANAGEMENT NOTIFICATIONS
  setupNotificationListenersUsers();
  
  // 2. DEVICE MANAGEMENT NOTIFICATIONS
  setupNotificationListenersDevices();

  // 3. NAVIGATION NOTIFICATIONS
  setupNotificationListenersEnvironment();
  
  // 4. ASSISTANCE NOTIFICATIONS
  setupNotificationListenersAssistance();

  // 7. COMMERCIAL NOTIFICATIONS
  setupNotificationListenersSales();

  // 8. ANALYTICS NOTIFICATIONS
  setupNotificationListenersAnalytics();
}

export default setupNotificationListeners;