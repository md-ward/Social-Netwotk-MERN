import { useEffect } from "react";
import AppRouter from "./router";
import { getCookie } from "./useCookie";
import PostServiceClient from "./global/webSockets/postsWebSocket";
import NotificationServiceClient from "./global/webSockets/notificationWebSocket";

const App = () => {
  useEffect(() => {
    if (getCookie("jwt_user")) {
      new NotificationServiceClient();
      new PostServiceClient();
    }
  }, []);
  return <AppRouter />;
};

export default App;
