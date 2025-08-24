import { useSearchParams } from "react-router-dom";
import { useUsers } from "../hooks/users";
import Table from "../ui/Table";
import Pagination from "../ui/Pagination";
import UserModal from "../ui/UserModal";
import { useState } from "react";

function Users() {
  const [userModal, setUserModal] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const { start, data, totalItems, totalPages } = useUsers(
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
        <h1 className="border-b-4 text-[27px] font-bold pr-4 w-fit border-b-yellow-500 dark:text-white dark:border-b-yellow-600">
          Users
        </h1>

        <Table
          columns={[
            "Username",
            "Email",
            "Phone",
            "Active directory",
            "Business unit",
            "Actions",
          ]}
          fields={[
            "username",
            "email",
            "phoneNumber",
            "activeDirectoryId",
            "businessUnitId",
          ]}
          data={data}
          type="user"
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
          onClick={() => setUserModal(true)}
          className="w-full text-center bg-yellow-500 dark:bg-yellow-600 text-white rounded py-2 text-lg mt-6 cursor-pointer "
        >
          Create New User
        </button>
      </div>

      <UserModal isOpen={userModal} onClose={() => setUserModal(false)} />
    </div>
  );
}

export default Users;
