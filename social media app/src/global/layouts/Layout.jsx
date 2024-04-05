import { Outlet } from "react-router-dom";
import Sidebar from "../widgets/sideBar";
import ContactSection from "../../home/widget/contacts";

const Layout = () => {
  return (
    <div className="flex min-h-screen w-full  bg-Antiflesh-color ">
      <div className="z-20 hidden w-[20%]  bg-slate-50  shadow-md lg:block ">
        <Sidebar />
      </div>
      <div className=" w-full p-2 md:p-0  lg:w-[60%] ">
        <Outlet />
      </div>
      <div className="z-20 hidden w-[20%] lg:block ">
        <ContactSection />
      </div>
    </div>
  );
};

export default Layout;
