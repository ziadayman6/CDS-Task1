import { useSearchParams } from "react-router-dom";
import { useActives } from "../hooks/active";
import Table from "../ui/Table";
import Pagination from "../ui/Pagination";
import ActiveModal from "../ui/ActiveModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function Activee() {
  const [activeModal, setActiveModal] = useState(false);
  const [pageSize, setPageSize] = useState(5);

  const { t, i18n } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const { start, data, totalItems, totalPages } = useActives(
    currentPage,
    pageSize
  );

  function setPage(num: number) {
    searchParams.set("page", String(num));
    setSearchParams(searchParams);
  }

  return (
    <div className="px-24 py-14 w-full">
      <div>
        <h1
          className={`border-b-4 text-[27px] font-bold ${
            i18n.language === "ar" ? "pl-4" : "pr-4"
          }  w-fit border-b-yellow-500 dark:text-white dark:border-b-yellow-600`}
        >
          {t("activeDirectories")}
        </h1>

        <Table
          columns={[t("name"), t("description"), t("actions")]}
          fields={["name", "description"]}
          data={data}
          type="active"
        />

        <Pagination
          setPage={setPage}
          start={start}
          totalPages={totalPages}
          totalItems={totalItems}
          currentPage={currentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>

      <div>
        <button
          onClick={() => setActiveModal(true)}
          className="w-full text-center bg-yellow-500 dark:bg-yellow-600 text-white rounded py-2 text-lg mt-6 cursor-pointer "
        >
          {t("createActiveDirectory")}
        </button>
      </div>

      <ActiveModal isOpen={activeModal} onClose={() => setActiveModal(false)} />
    </div>
  );
}

export default Activee;
