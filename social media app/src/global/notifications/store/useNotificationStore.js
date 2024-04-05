import { create } from "zustand";
import {
  getUnReadUserNotificationsCount,
  getUserNotifications,
  markNotificationAsRead,
} from "../controllers/notificationController";

const useNotificationStore = create((set) => ({
  isLoading: false,
  error: null,
  notifications: [],
  unReadNotificationsCount: null,

  handleFetchingUnReadNotificationsCount: async () => {
    try {
      const notificationsCount = await getUnReadUserNotificationsCount();
      set({ unReadNotificationsCount: notificationsCount });
    } catch (error) {
      console.warn(error);
    }
  },
  handleUpdateNewNotifications: (notification) => {
    const notifications = useNotificationStore.getState().notifications;
    set({
      notifications: [notification, ...notifications],
      unReadNotificationsCount:
        useNotificationStore.getState().unReadNotificationsCount + 1,
    });
  },
  handleFetchingNotifications: async () => {
    set({ isLoading: true });
    try {
      const notifications = await getUserNotifications();

      set({
        notifications,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  },
  handleMarkNotificationAsRead: async (notificationId) => {
    try {
      const updatedNotification = await markNotificationAsRead(notificationId);
      set((state) => ({
        notifications: state.notifications.map((notification) =>
          notification._id === updatedNotification._id
            ? updatedNotification
            : notification,
        ),
        unReadNotificationsCount: state.unReadNotificationsCount - 1,
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useNotificationStore;
