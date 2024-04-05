import axios from "axios";
import { getCookie } from "../../useCookie";
const URL = import.meta.env.VITE_API_URL;

export async function addNewComment(postId, commentText) {
  try {
    const token = getCookie("jwt_user");
    const response = await axios.post(
      `${URL}/comments/`,
      {
        postId,
        commentText,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.warn(error);
    throw error.response.data.errorMessage;
  }
}

export async function getPostComments(postId) {
  try {
    const token = getCookie("jwt_user");
    const response = await axios.get(`${URL}/comments/${postId}`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.warn(error);
    throw error.response.data.errorMessage;
  }
}
