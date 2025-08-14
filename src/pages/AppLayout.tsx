import { Outlet } from "react-router-dom";
import SideBar from "./../ui/SideBar";

function AppLayout() {
  return (
    <div className="flex">
      <SideBar />
      <div className="overflow-scroll h-[100dvh] scrollbar-hide w-[85%]">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
