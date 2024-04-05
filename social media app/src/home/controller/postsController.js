import axios from "axios";
import { getCookie } from "../../useCookie";
const URL = import.meta.env.VITE_API_URL;

export async function getSinglePost(postId) {
  try {
    const token = getCookie("jwt_user");
    const response = await axios.get(`${URL}/posts/${postId}`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(response.data.post);
    return response.data.post;
  } catch (error) {
    console.warn(error);
    throw error.response.data.errorMessage;
  }
}
export async function getGeneralPosts() {
  try {
    const token = getCookie("jwt_user");

    const response = await axios.get(`${URL}/posts`, {
      headers: {
        Authorization: token,
      },
    });
    // console.log(response.data);
    return response.data.posts;
  } catch (error) {
    console.warn(error);
    throw error.response.data.errorMessage;
  }
}

export async function getPersonalProfilePosts() {
  try {
    const token = getCookie("jwt_user");

    const response = await axios.get(`${URL}/posts/personal`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(response.data);
    return response.data.posts;
  } catch (error) {
    console.warn(error);
    throw error.response.data.errorMessage;
  }
}

export async function addPost(formData) {
  try {
    const token = getCookie("jwt_user");

    const response = await axios.post(`${URL}/posts`, formData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response.data);
  } catch (error) {
    throw error.response.data.errorMessage;
  }
}
