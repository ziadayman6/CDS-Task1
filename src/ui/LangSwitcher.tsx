/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
// import { useTranslation } from "react-i18next";

function LangSwitcher() {
//   const { i18n, t } = useTranslation();

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
      <p
        onClick={() => {
        //   i18n.changeLanguage("ar");
          localStorage.setItem("CDSlang", "ar");
          document.documentElement.dir = "rtl";
        }}
        className=" bg-yellow-500 rounded text-[15px] px-2 py-1 text-white dark:bg-transparent dark:text-gray-700 cursor-pointer flex items-center gap-1"
      >
        AR
      </p>
      <p
        onClick={() => {
        //   i18n.changeLanguage("en");
          localStorage.setItem("CDSlang", "en");
          document.documentElement.dir = "ltr";
        }}
        className=" bg-yellow-500 rounded text-[15px] px-2 py-1 text-white dark:bg-transparent dark:text-gray-700 cursor-pointer flex items-center gap-1"
      >
        EN
      </p>
    </div>
  );
}

export default LangSwitcher;
