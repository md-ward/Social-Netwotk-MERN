import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import useNotificationStore from "../store/useNotificationStore";
import Loader from "../../widgets/loader";
import useFriendStore from "../../../home/store/useFriendStore";
import { FriendResponse, NotificationType } from "../../../enums";
import { useNavigate } from "react-router-dom";

const NotificationsPage = () => {
  const {
    isLoading,
    notifications,
    handleFetchingNotifications,
    handleMarkNotificationAsRead,
  } = useNotificationStore((state) => ({
    isLoading: state.isLoading,
    notifications: state.notifications,
    handleFetchingNotifications: state.handleFetchingNotifications,
    handleMarkNotificationAsRead: state.handleMarkNotificationAsRead,
  }));

  const { handleResponedToFriendRequist } = useFriendStore((state) => ({
    handleResponedToFriendRequist: state.handleResponedToFriendRequist,
  }));

  useEffect(() => {
    if (notifications.length == 0) {
      handleFetchingNotifications();
    }
  }, [handleFetchingNotifications, notifications]);

  const navigate = useNavigate();
  function navToNewPost(postId) {
    navigate(`/${postId}`);
  }

  return (
    <section className="custom-scrollbar flex max-h-screen min-h-full  flex-col gap-3 overflow-y-scroll bg-white p-4">
      <h1 className="mb-4 text-2xl font-bold">
        <FontAwesomeIcon icon={faBell} className="mr-2" />
        Notifications
      </h1>
      {isLoading && <Loader />}
      {notifications?.map((notification) => (
        <div
          key={notification._id}
          onClick={
            notification.type == NotificationType.NewPost &&
            !notification.isRead
              ? () => {
                  console.count();
                  handleMarkNotificationAsRead(notification._id),
                    navToNewPost(notification.postId);
                }
              : notification.type == NotificationType.NewPost
                ? () => navToNewPost(notification.postId)
                : null
          }
          className={`flex items-center justify-between rounded-md px-4 
          ${notification.isRead ? "bg-gray-100" : "bg-blue-100"}
           cursor-pointer p-4 transition-colors hover:bg-gray-200`}
        >
          <div className="flex items-center">
            <div className="h-12 w-12 overflow-hidden rounded-full">
              <img
                src={notification.senderProfileId.profileImage.originalUrl}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ml-4 flex flex-col">
              <h2 className="text-lg font-semibold">{notification.type}</h2>
              <p className="text-gray-600">{notification.message}</p>
              <p className="text-sm text-gray-500">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {notification.type === NotificationType.FriendReq &&
            !notification.isRead && (
              <span className="flex gap-5">
                <button
                  onClick={() =>
                    handleResponedToFriendRequist(
                      notification._id,
                      FriendResponse.Accept,
                    )
                  }
                  className="rounded-md border-dark-blue bg-dark-blue px-4 py-2 text-white transition-colors hover:border hover:bg-white hover:text-dark-blue"
                >
                  Accept
                </button>
                <button
                  onClick={() =>
                    handleResponedToFriendRequist(
                      notification._id,
                      FriendResponse.Decline,
                    )
                  }
                  className="rounded-md border-dark-blue bg-rose-500 px-4 py-2 text-white transition-colors hover:border hover:bg-white hover:text-dark-blue"
                >
                  Decline
                </button>
              </span>
            )}
        </div>
      ))}
    </section>
  );
};

export default NotificationsPage;
