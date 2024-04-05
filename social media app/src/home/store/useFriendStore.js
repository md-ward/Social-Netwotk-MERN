import { create } from "zustand";
import {
  getFriendsToAdd,
  responedToFriendRequist,
  sendFriendRequist,
} from "../controller/friendsController";
import useProfileStore from "../../profile/store/useProfileStore";

const useFriendStore = create((set) => ({
  isLoading: false,
  error: null,
  friends: [],
  handleFetchingFriends: async () => {
    set({ isLoading: true });
    await getFriendsToAdd()
      .then((friends) => {
        set({ friends, isLoading: false });
      })
      .catch((error) => {
        console.warn(error);
      });
  },
  handleSendingFriendRequist: async (profileId) => {
    set({ isLoading: true });
    try {
      await sendFriendRequist(profileId);
      let newPersonalProfileDetails =
        useProfileStore.getState().personalProfileDetails;
      newPersonalProfileDetails.pendingFriendRequests = [
        ...newPersonalProfileDetails.pendingFriendRequests,
        profileId,
      ];
      useProfileStore.setState({
        personalProfileDetails: newPersonalProfileDetails,
      });
      set({ isLoading: false });
    } catch (error) {
      console.warn(error);
      set({ error, isLoading: false });
    }
  },
  checkPendingFriendRequests: (profileId) => {
    const pendingFriends =
      useProfileStore.getState().personalProfileDetails.pendingFriendRequests;
    if (pendingFriends.includes(profileId)) {
      return true;
    } else {
      return false;
    }
  },

  handleResponedToFriendRequist: async (notificationId, friendResponse) => {
    try {
      await responedToFriendRequist(notificationId, friendResponse);
    } catch (error) {
      console.log(error);
    }
  },
}));
export default useFriendStore;
