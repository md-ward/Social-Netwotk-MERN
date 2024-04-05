import { Outlet, Route, Routes } from "react-router-dom";
import useRegisteringStore from "./registering/store/useRegisteringStore";
import RegistrationPage from "./registering/view/register_page";
import Layout from "./global/layouts/Layout";
import HomePage from "./home/view/homePage";
import ProfilePage from "./profile/view/profilePage";
import FriendsPage from "./home/view/friendsPage";
import NotificationsPage from "./global/notifications/view/notificationsPage";
import SinglePostPage from "./home/view/singlePostDetails";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<HomePage />}></Route>
        <Route path="/friends" element={<FriendsPage />}></Route>
        <Route path="/:postId" element={<SinglePostPage />}></Route>
        <Route path="/notifications" element={<NotificationsPage />}></Route>
      </Route>
      <Route element={<ProfileProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />}></Route>
      </Route>
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export default AppRouter;

//! user Protected Route..........
const ProtectedRoute = () => {
  const { isLogedIn } = useRegisteringStore((state) => ({
    isLogedIn: state.isLogedIn,
  }));

  return isLogedIn ? <Layout /> : <RegistrationPage />;
};
//! user Protected Route..........
const ProfileProtectedRoute = () => {
  const { isLogedIn } = useRegisteringStore((state) => ({
    isLogedIn: state.isLogedIn,
  }));

  return isLogedIn ? <Outlet /> : <RegistrationPage />;
};

const NoMatch = () => {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center p-7">
        <h1 className="jump-and-shake text-5xl font-bold text-dark-blue transition-transform duration-500">
          Error 404
        </h1>
        <p className="mt-4 text-xl ">
          Sorry, the page you requested could not be found.
        </p>
      </div>
    </>
  );
};
