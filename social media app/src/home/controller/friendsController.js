import axios from "axios";
import { getCookie } from "../../useCookie";
const URL = import.meta.env.VITE_API_URL;

export async function getFriendsToAdd() {
  try {
    const response = await axios.get(`${URL}/account/profile/`, {
      headers: {
        Authorization: getCookie("jwt_user"),
      },
    });
    console.log(response.data.profiles);
    return response.data.profiles;
  } catch (error) {
    throw error.response.data.errorMessage;
  }
}

export async function sendFriendRequist(profileId) {
  const token = getCookie("jwt_user");

  try {
    const response = await axios.post(
      `${URL}/account/profile/friend`,
      { profileId },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data.errorMessage;
  }
}

export async function responedToFriendRequist(notificationId, friendResponse) {
  const token = getCookie("jwt_user");

  try {
    const response = await axios.post(
      `${URL}/account/notification/friendResponse`,
      { notificationId, friendResponse },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data.errorMessage;
  }
}
