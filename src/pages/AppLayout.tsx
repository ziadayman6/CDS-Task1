import { Outlet } from "react-router-dom";
import SideBar from "./../ui/SideBar";

function AppLayout() {
  return (
    <div className="flex">
      <SideBar />
      <div className="overflow-scroll h-[100dvh] bg-gray-50 dark:bg-[#0f181f] scrollbar-hide w-full shadow-inner">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
