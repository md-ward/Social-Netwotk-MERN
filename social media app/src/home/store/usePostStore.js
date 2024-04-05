import { create } from "zustand";
import {
  addPost,
  getGeneralPosts,
  getSinglePost,
} from "../controller/postsController";

const usePostStore = create((set) => ({
  isLoading: false,
  error: null,
  singlePost: {
    _id: "",
    user: {
      _id: "",
      first_name: "",
      last_name: "",
      profile: {
        _id: "",
        user_name: "",
        profileImage: {
          _id: "",
          originalUrl: "",
        },
      },
    },
    content: "",
    likes: [],
    attachedImages: [],
    comments: [],
    createdAt: "",
    updatedAt: "",
  },
  posts: [],

  handleFetchingSinglePost: async (postId) => {
    try {
      const singlePost = await getSinglePost(postId);
      set({ singlePost });
    } catch (error) {
      console.warn(error);
      set({ error });
    }
  },



  
  handleSubmittingNewPost: async (formData) => {
    set({ isLoading: true });
    try {
      await addPost(formData);
      set({ isLoading: false });
    } catch (error) {
      set({ error });
    }
  },
  handleGettingGeneralPosts: async () => {
    try {
      set({ isLoading: true });
      const posts = await getGeneralPosts();
      set({ posts, isLoading: false });
    } catch (error) {
      set({ error });
    }
  },
  handleUpdateNewPost: (post) => {
    set((state) => ({
      posts: [...state.posts, post],
    }));
  },
}));
export default usePostStore;
