import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { notificationsService } from '../services/notifications/notificationsService';
import { inAppChannelService } from '../services/notifications/inAppChannelService';
import { NotificationPayload } from '../services/notifications/types/payload';
import { updateNotificationInput } from '../services/notifications/types/Notifications.types';

// Mock the fetch function with proper typing
const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
global.fetch = mockFetch;

// Helper function to create Response objects
const createMockResponse = (data: any) => {
  const processedResponse = new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });

  // Override the json method to handle date parsing
  processedResponse.json = async () => {
    const rawData = JSON.parse(JSON.stringify(data));
    const processData = (obj: any): any => {
      if (Array.isArray(obj)) return obj.map(processData);
      if (obj && typeof obj === 'object') {
        const processed = { ...obj };
        if (obj.created_at) processed.created_at = new Date(obj.created_at);
        if (obj.sent_at) processed.sent_at = new Date(obj.sent_at);
        return processed;
      }
      return obj;
    };
    return processData(rawData);
  };

  return processedResponse;
};

// Mock the inAppChannelService
jest.mock('../services/notifications/inAppChannelService');

describe('Notifications Service', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    // Reset fetch mock
    mockFetch.mockReset();
  });

  // Test notify
  describe('notify', () => {
    it('should send a notification with in-app channel', async () => {
      const notificationPayload: NotificationPayload = {
        requestId: 'test-123',
        timestamp: new Date().toISOString(),
        notificationType: 'test',
        channels: ['in-app', 'email'],
        broadcast: false,
        recipient: [{ userId: 1, email: 'test@example.com' }],
        message: {
          subject: 'Test Subject',
          body: 'Test Body'
        }
      };
      
      // Mock the inAppChannelService
      const mockSendNotification = inAppChannelService.sendNotification as jest.MockedFunction<typeof inAppChannelService.sendNotification>;
      mockSendNotification.mockResolvedValue(undefined);
      
      // Mock the fetch response
      mockFetch.mockResolvedValue(createMockResponse({ success: true }));
      
      const result = await notificationsService.notify(notificationPayload);
      
      expect(result).toEqual({ success: true });
      expect(inAppChannelService.sendNotification).toHaveBeenCalledWith(notificationPayload);
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3002/notify',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(notificationPayload)
        })
      );
    });
    
    it('should send a notification without in-app channel', async () => {
      const notificationPayload: NotificationPayload = {
        requestId: 'test-123',
        timestamp: new Date().toISOString(),
        notificationType: 'test',
        channels: ['email'],
        broadcast: false,
        recipient: [{ userId: 1, email: 'test@example.com' }],
        message: {
          subject: 'Test Subject',
          body: 'Test Body'
        }
      };
      
      // Mock the fetch response
      mockFetch.mockResolvedValue(createMockResponse({ success: true }));
      
      const result = await notificationsService.notify(notificationPayload);
      
      expect(result).toEqual({ success: true });
      expect(inAppChannelService.sendNotification).not.toHaveBeenCalled();
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3002/notify',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(notificationPayload)
        })
      );
    });
  });

  // Test getNotifications
  describe('getNotifications', () => {
    it('should get notifications for a user', async () => {
      const mockNotifications = [
        { 
          id: 1, 
          user_id: 1, 
          title: 'Test Notification', 
          message: 'Test Message',
          type: 'email',
          metadata: {},
          is_read: false,
          created_at: new Date(),
          sent_at: new Date(),
          read_at: null
        }
      ];
      
      // Mock the fetch response
      mockFetch.mockResolvedValue(createMockResponse(mockNotifications));
      
      const result = await notificationsService.getNotifications(1);
      
      expect(result).toEqual(mockNotifications);
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3002/notifications/1');
    });
  });

  // Test getNotificationById
  describe('getNotificationById', () => {
    it('should get a notification by id', async () => {
      const mockNotification = {
        id: 1, 
        user_id: 1, 
        title: 'Test Notification', 
        message: 'Test Message',
        type: 'email',
        metadata: {},
        is_read: false,
        created_at: new Date(),
        sent_at: new Date(),
        read_at: null
      };
      
      // Mock the fetch response
      mockFetch.mockResolvedValue(createMockResponse(mockNotification));
      
      const result = await notificationsService.getNotificationById(1);
      
      expect(result).toEqual(mockNotification);
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3002/notifications/1');
    });
  });

  // Test createNotification
  describe('createNotification', () => {
    it('should create a notification', async () => {
      const notificationPayload: NotificationPayload = {
        requestId: 'test-123',
        timestamp: new Date().toISOString(),
        notificationType: 'test',
        channels: ['email'],
        broadcast: false,
        recipient: [{ userId: 1, email: 'test@example.com' }],
        message: {
          subject: 'Test Subject',
          body: 'Test Body'
        }
      };
      
      // Mock the fetch response
      mockFetch.mockResolvedValue(createMockResponse({ success: true, id: 1 }));
      
      const result = await notificationsService.createNotification(notificationPayload);
      
      expect(result).toEqual({ success: true, id: 1 });
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3002/notifications',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(notificationPayload)
        })
      );
    });
  });

  // Test updateNotification
  describe('updateNotification', () => {
    it('should update a notification', async () => {
      const updateData: updateNotificationInput = {
        title: 'Updated Title',
        message: 'Updated Message',
        read: true
      };
      
      // Mock the fetch response
      mockFetch.mockResolvedValue(createMockResponse({ success: true, id: 1, ...updateData }));
      
      const result = await notificationsService.updateNotification(1, updateData);
      
      expect(result).toEqual({ success: true, id: 1, ...updateData });
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3002/notifications/1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(updateData)
        })
      );
    });
  });

  // Test markNotificationAsRead
  describe('markNotificationAsRead', () => {
    it('should mark a notification as read', async () => {
      // Mock the fetch response
      mockFetch.mockResolvedValue(createMockResponse({ success: true, id: 1, is_read: true }));
      
      const result = await notificationsService.markNotificationAsRead(1);
      
      expect(result).toEqual({ success: true, id: 1, is_read: true });
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3002/notifications/1/read',
        expect.objectContaining({
          method: 'PUT'
        })
      );
    });
  });

  // Test markNotificationAsUnread
  describe('markNotificationAsUnread', () => {
    it('should mark a notification as unread', async () => {
      // Mock the fetch response
      mockFetch.mockResolvedValue(createMockResponse({ success: true, id: 1, is_read: false }));
      
      const result = await notificationsService.markNotificationAsUnread(1);
      
      expect(result).toEqual({ success: true, id: 1, is_read: false });
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3002/notifications/1/unread',
        expect.objectContaining({
          method: 'PUT'
        })
      );
    });
  });

  // Test deleteNotification
  describe('deleteNotification', () => {
    it('should delete a notification', async () => {
      // Mock the fetch response
      mockFetch.mockResolvedValue(createMockResponse({ success: true, id: 1 }));
      
      const result = await notificationsService.deleteNotification(1);
      
      expect(result).toEqual({ success: true, id: 1 });
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3002/notifications/1',
        expect.objectContaining({
          method: 'DELETE'
        })
      );
    });
  });
}); 