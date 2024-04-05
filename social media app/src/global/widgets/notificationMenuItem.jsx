import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import useNotificationStore from "../notifications/store/useNotificationStore";
import { useEffect } from "react";

const NotificationMenuItem = () => {
  const { unReadNotificationsCount, handleFetchingUnReadNotificationsCount } =
    useNotificationStore((state) => ({
      unReadNotificationsCount: state.unReadNotificationsCount,
      handleFetchingUnReadNotificationsCount:
        state.handleFetchingUnReadNotificationsCount,
    }));
  useEffect(() => {
    handleFetchingUnReadNotificationsCount();
  }, [handleFetchingUnReadNotificationsCount]);
  return (
    <NavLink
      to="/notifications"
      className={({ isActive }) =>
        isActive
          ? "cursor-pointer divide-x-2 rounded-lg bg-blue-300 shadow-md [&_span]:text-white"
          : "flex cursor-pointer items-center duration-200 ease-in-out hover:rounded-lg hover:bg-white hover:shadow-md"
      }
    >
      <li className="flex items-center gap-x-2">
        <FontAwesomeIcon
          icon={faBell}
          className="size-8 cursor-pointer rounded-lg bg-orange-500 p-1 text-white shadow-md group-hover:bg-orange-500"
        />
        <span className="select-none text-gray-600">Notifications</span>
        <p className="rounded-full bg-rose-500 px-2 text-center text-white ">
          {unReadNotificationsCount}
        </p>
      </li>
    </NavLink>
  );
};

export default NotificationMenuItem;
