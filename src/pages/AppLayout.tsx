import { Link, Outlet } from "react-router-dom";
import SideBar from "./../ui/SideBar";
import BottomBar from "../ui/BottomBar";
import { useTranslation } from "react-i18next";

function AppLayout() {
  const { i18n } = useTranslation();

  function applyTheme(value: string) {
    document.documentElement.className = "";
    document.documentElement.classList.add(value);
    localStorage.setItem("CDStheme", value);
  }

  return (
    <div className="flex max-sm:flex-col">
      <SideBar />
      <div className="overflow-scroll h-[100dvh] max-sm:h-[89dvh] bg-gray-50 dark:bg-[#0f181f] scrollbar-hide w-full shadow-inner">
        <div className="flex items-center justify-between">
          <div className="m-3 flex gap-2 sm:hidden">
            <i
              onClick={() => applyTheme("light")}
              className="bi bi-sun-fill text-xl dark:bg-[#1a273b] h-9 dark:text-gray-500 bg-yellow-500 px-2 py-0.5 rounded text-white"
            ></i>
            <i
              onClick={() => applyTheme("dark")}
              className="bi bi-moon-fill text-xl dark:bg-yellow-600 h-9 bg-gray-200 text-gray-400 px-2 py-0.5 rounded dark:text-white"
            ></i>
          </div>
          <Link
            to="/users"
            className="flex items-center justify-center group-hover:justify-start gap-5 sm:hidden"
          >
            <div className="bg-[url('/crud.png')] bg-cover bg-center w-10 h-10 rounded-4xl shrink-0"></div>
          </Link>
          <div className="m-3 flex gap-2 sm:hidden">
            <p
              onClick={() => {
                i18n.changeLanguage("ar");
                localStorage.setItem("CDSlang", "ar");
                document.documentElement.dir = "rtl";
              }}
              className={` ${
                i18n.language === "ar"
                  ? "bg-yellow-500 text-white dark:bg-yellow-600"
                  : " dark:bg-[#1a273b] bg-gray-200 dark:text-gray-500 text-gray-400"
              }  text-sm px-2 py-0.5 rounded flex justify-center items-center h-9`}
            >
              AR
            </p>
            <p
              onClick={() => {
                i18n.changeLanguage("en");
                localStorage.setItem("CDSlang", "en");
                document.documentElement.dir = "ltr";
              }}
              className={` ${
                i18n.language === "en"
                  ? "bg-yellow-500 text-white dark:bg-yellow-600"
                  : " dark:bg-[#1a273b] bg-gray-200 dark:text-gray-500 text-gray-400"
              }  text-sm px-2 py-0.5 rounded flex justify-center items-center h-9`}
            >
              EN
            </p>
          </div>
        </div>
        <Outlet />
      </div>
      <BottomBar />
    </div>
  );
}

export default AppLayout;
