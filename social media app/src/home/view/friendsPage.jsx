import { useEffect } from "react";
import useFriendStore from "../store/useFriendStore";
import Loader from "../../global/widgets/loader";

const FriendsPage = () => {
  const {
    isLoading,
    friends,
    handleFetchingFriends,
    handleSendingFriendRequist,
    checkPendingFriendRequests,
  } = useFriendStore((state) => ({
    isLoading: state.isLoading,
    friends: state.friends,
    handleFetchingFriends: state.handleFetchingFriends,
    handleSendingFriendRequist: state.handleSendingFriendRequist,
    checkPendingFriendRequests: state.checkPendingFriendRequests,
  }));

  useEffect(() => {
    handleFetchingFriends();
  }, [handleFetchingFriends]);

  return (
    <section className="flex min-h-full flex-col bg-white p-4">
      <h1 className="mb-4 text-2xl font-bold">People you may know</h1>
      {isLoading && <Loader />}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {friends?.map((friend) => (
          <div
            key={friend._id}
            className="flex flex-col items-center rounded-md border border-dark-blue bg-Antiflesh-color p-4 "
          >
            <div className="h-12 w-12 overflow-hidden rounded-full">
              <img
                src={friend?.profileImage?.originalUrl}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ml-4 flex flex-col items-center justify-center">
              <h2 className="text-lg font-semibold">
                {friend.user?.first_name} {friend.user?.last_name}
              </h2>
              <div className="mt-2">
                <>
                  {checkPendingFriendRequests(friend._id) ? (
                    <button
                      onClick={() => handleSendingFriendRequist(friend._id)}
                      className="rounded-md border-dark-blue bg-rose-500 px-4 py-2 text-white transition-colors hover:border hover:bg-white hover:text-dark-blue"
                    >
                      Cancel Request
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSendingFriendRequist(friend._id)}
                      className="rounded-md border-dark-blue bg-dark-blue px-4 py-2 text-white transition-colors hover:border hover:bg-white hover:text-dark-blue"
                    >
                      Add Friend
                    </button>
                  )}
                </>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FriendsPage;
