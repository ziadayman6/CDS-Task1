import { Link, NavLink } from "react-router-dom";

function SideBar() {
  return (
    <div className="w-[15%] h-[100dvh] flex flex-col items-center bg-gray-50 py-14 gap-5">
      <NavLink
        to="/users"
        className={({ isActive }) =>
          isActive ? "active-link" : "inactive-link"
        }
      >
        Users
      </NavLink>
      <NavLink
        to="/business"
        className={({ isActive }) =>
          isActive ? "active-link" : "inactive-link"
        }
      >
        Business units
      </NavLink>
      <NavLink
        to="/active-directory"
        className={({ isActive }) =>
          isActive ? "active-link" : "inactive-link"
        }
      >
        Active dir
      </NavLink>
      <Link to="/" className="logout-link">Logout</Link>
    </div>
  );
}

export default SideBar;
