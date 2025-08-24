/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

function Switcher() {
  const [theme, setTheme] = useState(
    localStorage.getItem("CDStheme") || "light"
  );

  function applyTheme(value: string) {
    document.documentElement.className = "";
    document.documentElement.classList.add(value);
    setTheme(value);
    localStorage.setItem("CDStheme", value);
  }

  return (
    <div className="bg-gray-200 dark:bg-[#0f181f] w-[65%] group-hover:w-[85%] rounded flex flex-col group-hover:flex-row justify-center items-center py-2 text-xl gap-3">
      <i
        onClick={() => applyTheme("light")}
        className="bi bi-sun-fill bg-yellow-500 rounded px-2 py-1 text-white dark:bg-transparent dark:text-gray-700 cursor-pointer flex items-center gap-1"
      >
        <span className="hidden group-hover:block text-lg">Light</span>
      </i>
      <i
        onClick={() => applyTheme("dark")}
        className="bi bi-moon-fill text-gray-400 rounded px-2 py-1 bg-transparent dark:bg-yellow-600 dark:text-white cursor-pointer flex items-center gap-1"
      >
        <span className="hidden group-hover:block text-lg">Dark</span>
      </i>
    </div>
  );
}

export default Switcher;
