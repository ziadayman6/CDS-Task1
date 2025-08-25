import { Link, NavLink } from "react-router-dom";

function BottomBar() {
  return (
    <div className="h-[11dvh] w-full bg-gray-100 sm:hidden flex items-center justify-around dark:bg-[#1a273b]">
      <NavLink
        to="/users"
        className={({ isActive }) =>
          isActive
            ? "bg-yellow-500 dark:bg-yellow-600 text-white text-center rounded-[10px] font-semibold flex justify-center items-center px-3 py-2"
            : "bg-gray-200 dark:bg-[#0f181f] text-center text-gray-400 dark:text-gray-700 rounded-[10px] font-semibold flex justify-center items-center px-3 py-2"
        }
      >
        <i className="bi bi-people-fill text-xl"></i>
      </NavLink>
      <NavLink
        to="/business"
        className={({ isActive }) =>
          isActive
            ? "bg-yellow-500 dark:bg-yellow-600 text-white text-center rounded-[10px] font-semibold flex justify-center items-center px-3 py-2"
            : "bg-gray-200 dark:bg-[#0f181f] text-center text-gray-400 dark:text-gray-700 rounded-[10px] font-semibold flex justify-center items-center px-3 py-2"
        }
      >
        <i className="bi bi-briefcase-fill text-xl"></i>
      </NavLink>
      <NavLink
        to="/active-directory"
        className={({ isActive }) =>
          isActive
            ? "bg-yellow-500 dark:bg-yellow-600 text-white text-center rounded-[10px] font-semibold flex justify-center items-center px-3 py-2"
            : "bg-gray-200 dark:bg-[#0f181f] text-center text-gray-400 dark:text-gray-700 rounded-[10px] font-semibold flex justify-center items-center px-3 py-2"
        }
      >
        <i className="bi bi-folder-fill text-xl"></i>
      </NavLink>
      <Link
        to="/"
        className="bg-red-500 dark:bg-red-800 text-white text-center rounded-[10px] font-semibold flex justify-center items-center px-3 py-2"
        onClick={() => localStorage.removeItem("CDS1-token")}
      >
        <i className="bi bi-box-arrow-right text-xl"></i>
      </Link>
    </div>
  );
}

export default BottomBar;
