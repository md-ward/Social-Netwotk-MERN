import { create } from "zustand";
import {
  addNewComment,
  getPostComments,
} from "../controller/commentsController";

const useCommentStore = create((set) => ({
  isLoading: false,
  error: null,
  comments: [],

  handleAddingNewComment: async (postId, commentTextRef) => {
    try {
      set({ isLoading: true });
      const comment = await addNewComment(postId, commentTextRef.current.value);
      set({
        isLoading: false,
        comments: [...useCommentStore.getState().comments, comment],
      });
      commentTextRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  },

  handleFetchingPostComments: async (postId) => {
    try {
      set({ isLoading: true });
      const comments = await getPostComments(postId);
      set({ isLoading: false, comments });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useCommentStore;
