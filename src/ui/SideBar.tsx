import { Link, NavLink } from "react-router-dom";
import Switcher from "./Switcher";
import LangSwitcher from "./LangSwitcher";
import { useTranslation } from "react-i18next";
// import LangSwitcher from "./LangSwitcher";

function SideBar() {
  const { t } = useTranslation();

  return (
    <div className="group max-sm:hidden w-[5%] hover:w-[20%] h-[100dvh] flex flex-col items-center py-14 gap-5 bg-white dark:bg-[#1a273b] shadow-md transition-all duration-300 overflow-hidden">
      {/* Logo / Title */}
      <Link
        to="/users"
        className="flex items-center justify-center group-hover:justify-start w-[85%] gap-5 mb-7"
      >
        <div className="bg-[url('/crud.png')] bg-cover bg-center w-12 h-12 rounded-4xl shrink-0"></div>
        <p className="font-semibold text-lg dark:text-white hidden group-hover:block transition-opacity duration-300 whitespace-nowrap">
          CRUD Site
        </p>
      </Link>

      {/* Users */}
      <NavLink
        to="/users"
        className={({ isActive }) =>
          ` transition-all duration-200 
          ${isActive ? "active-link" : "inactive-link"}
          `
        }
      >
        <i className="bi bi-people-fill text-xl"></i>
        <span className="hidden group-hover:block transition-opacity duration-300 whitespace-nowrap">
          {t("users")}
        </span>
      </NavLink>

      {/* Business Units */}
      <NavLink
        to="/business"
        className={({ isActive }) =>
          `transition-all duration-200 ${
            isActive ? "active-link" : "inactive-link"
          }`
        }
      >
        <i className="bi bi-briefcase-fill text-xl"></i>
        <span className="hidden group-hover:block transition-opacity duration-300 whitespace-nowrap">
          {t("businessUnits")}
        </span>
      </NavLink>

      {/* Active Directory */}
      <NavLink
        to="/active-directory"
        className={({ isActive }) =>
          `transition-all duration-200 ${
            isActive ? "active-link" : "inactive-link"
          }`
        }
      >
        <i className="bi bi-folder-fill text-xl"></i>
        <span className="hidden group-hover:block transition-opacity duration-300 whitespace-nowrap">
          {t("activeDirectories")}
        </span>
      </NavLink>

      {/* Logout */}
      <div className="w-full flex flex-col items-center mt-auto gap-5">
        <LangSwitcher />
        <Switcher />
        <Link
          to="/"
          className="logout-link"
          onClick={() => {
            localStorage.removeItem("CDS1-token");
          }}
        >
          <i className="bi bi-box-arrow-right text-xl"></i>
          <span className="hidden group-hover:block transition-opacity duration-300 whitespace-nowrap">
            {t("logout")}
          </span>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
