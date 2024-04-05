import axios from "axios";
import { getCookie } from "../../useCookie";
const URL = import.meta.env.VITE_API_URL;

export async function getPersonalProfileDetails() {
  const token = getCookie("jwt_user");

  try {
    const response = await axios.get(`${URL}/account/profile/personal`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data.errorMessage;
  }
}

export async function getUsersProfileDetails(profileId) {
  const token = getCookie("jwt_user");

  try {
    const response = await axios.get(`${URL}/account/profile/${profileId}`, {
      headers: {
        Authorization: token,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data.errorMessage;
  }
}
