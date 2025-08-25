import { useTranslation } from "react-i18next";

type Pagination = {
  totalPages: number;
  start: number;
  totalItems: number;
  setPage: (num: number) => void;
  currentPage: number;
  pageSize: number;
  setPageSize: (size: number) => void;
};

function Pagination({
  totalPages,
  start,
  totalItems,
  setPage,
  currentPage,
  pageSize,
  setPageSize,
}: Pagination) {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex justify-between items-center mt-5">
      <div className="text-black dark:text-white">
        {t("showResults")} <span>{start + 1}</span> -
        <span> {start + totalItems}</span>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-black dark:text-white">
          {t("resultsPerPage")}
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="border rounded px-1 py-0.5 text-black focus:outline-none dark:text-white"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size} className="dark:bg-[#1a273b]">
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 items-center justify-end flex-wrap w-[60%]">
        <div
          className={`cursor-pointer ${currentPage === 1 ? "hidden" : ""} `}
          onClick={() => setPage(currentPage - 1)}
        >
          <i
            className={`bi ${
              i18n.language === "en" ? "bi-arrow-left" : "bi-arrow-right"
            } text-yellow-500 dark:text-yellow-600 text-2xl`}
          ></i>
        </div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => {
              setPage(index + 1);
            }}
            className={`cursor-pointer px-3 py-1.5 text-sm font-bold rounded-4xl ${
              currentPage === index + 1
                ? "bg-yellow-500 dark:bg-yellow-600 text-white border-yellow-500 dark:border-yellow-600 border-[1px]"
                : "text-yellow-500 dark:text-yellow-600 border-none"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <div
          className={`cursor-pointer ${
            currentPage === totalPages ? "hidden" : ""
          } `}
          onClick={() => setPage(currentPage + 1)}
        >
          <i
            className={`bi ${
              i18n.language === "ar" ? "bi-arrow-left" : "bi-arrow-right"
            } text-yellow-500 dark:text-yellow-600 text-2xl`}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
