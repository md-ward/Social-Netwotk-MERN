import { io } from "socket.io-client";
import { getCookie } from "../../useCookie";
import usePostStore from "../../home/store/usePostStore";
const URL = import.meta.env.VITE_POSTS_SOCKET_URL;

class PostServiceClient {
  #audio;
  constructor() {
    this.#audio = new Audio("/assets/sounds/notification.mp3");

    const jwtToken = getCookie("jwt_user");
    this.socket = io(URL, {
      extraHeaders: { Authorization: jwtToken },
      path: "/postsUpdates",
    });

    // Event handlers
    this.socket.on("connect", () => {
      console.log("Connected to Posts server");
    });

    this.socket.on("newPost", (post) => {
      console.warn("new post from freind:", post);
      this.#audio.play();
      usePostStore.getState().handleUpdateNewPost(post);
    });
    this.socket.on("postLike", (postId) => {});

    this.socket.on("disconnect", () => {
      console.log("Disconnected from notification server");
    });

    this.socket.on("connect_error", (error) => {
      console.log("Connection error:", error);
    });
  }
}
export default PostServiceClient;
