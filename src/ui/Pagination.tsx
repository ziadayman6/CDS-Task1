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

  const maxVisible = 6;

  let startPage = currentPage;
  let endPage = currentPage + maxVisible - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, totalPages - maxVisible + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  if (totalItems === 0 && totalPages !== 0) {
    setPage(currentPage - 1);
  }

  if (totalPages === 0) {
    return;
  }

  return (
    <div className="flex max-sm:flex-col max-sm:items-start max-sm:gap-2 justify-between items-center mt-5">
      <div className="text-black dark:text-white max-sm:text-sm">
        {t("showResults")} <span>{start + 1}</span> -
        <span> {start + totalItems}</span>
      </div>

      <div className="flex items-center gap-2 max-sm:text-sm">
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

      <div className="flex gap-3 items-center justify-end max-sm:justify-start flex-wrap w-[60%]">
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
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setPage(page)}
            className={`cursor-pointer px-3 py-1.5 max-sm:px-2 max-sm:py-0.5 text-sm font-bold rounded-4xl ${
              currentPage === page
                ? "bg-yellow-500 dark:bg-yellow-600 text-white border-yellow-500 dark:border-yellow-600 border-[1px]"
                : "text-yellow-500 dark:text-yellow-600 border-none"
            }`}
          >
            {page}
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
