import { useSearchParams } from "react-router-dom";
import { useBusinesses } from "../hooks/business";
import Pagination from "../ui/Pagination";
import Table from "../ui/Table";
import BusinessModal from "../ui/BusinessModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function Businesss() {
  const [businessModal, setBusinessModal] = useState(false);
  const [pageSize, setPageSize] = useState(5);

  const { t, i18n } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const { start, data, totalItems, totalPages } = useBusinesses(
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
          {t("businessUnits")}
        </h1>

        <Table
          columns={[t("name"), t("code"), t("actions")]}
          fields={["name", "code"]}
          data={data}
          type="business"
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
          onClick={() => setBusinessModal(true)}
          className="w-full text-center bg-yellow-500 dark:bg-yellow-600 text-white rounded py-2 text-lg mt-6 cursor-pointer "
        >
          {t("createBusinessUnit")}
        </button>
      </div>

      <BusinessModal
        isOpen={businessModal}
        onClose={() => setBusinessModal(false)}
      />
    </div>
  );
}

export default Businesss;
