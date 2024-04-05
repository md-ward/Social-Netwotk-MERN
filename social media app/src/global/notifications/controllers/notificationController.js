import axios from "axios";
import { getCookie } from "../../../useCookie";
const URL = import.meta.env.VITE_API_URL;

export async function getUserNotifications() {
  try {
    const response = await axios.get(`${URL}/account/notification`, {
      headers: {
        Authorization: getCookie("jwt_user"),
      },
    });
    console.log(response.data);
    return response.data.notifications;
  } catch (error) {
    throw error.response.data.errorMessage;
  }
}
export async function getUnReadUserNotificationsCount() {
  try {
    const response = await axios.get(`${URL}/account/notification/count`, {
      headers: {
        Authorization: getCookie("jwt_user"),
      },
    });
    console.log(response.data);
    return response.data.count;
  } catch (error) {
    throw error.response.data.errorMessage;
  }
}

export async function markNotificationAsRead(notificationId) {
  try {
    const token = getCookie("jwt_user");
    const response = await axios.put(
      `${URL}/account/notification`,
      { notificationId },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error.response.data.errorMessage;
  }
}

export async function responedToFriendRequistNotification(
  notificationId,
  friendResponse,
) {
  try {
    const response = await axios.post(
      `${URL}/account/notification/friendResponse`,
      {
        data: {
          notificationId,
          friendResponse,
        },
        headers: {
          Authorization: getCookie("jwt_user"),
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data.errorMessage;
  }
}
