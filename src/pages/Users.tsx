import { useSearchParams } from "react-router-dom";
import { useUsers } from "../hooks/users";
import Table from "../ui/Table";
import Pagination from "../ui/Pagination";
import { useForm, type Resolver } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { addUser, type User } from "../slices/usersSlice";
import toast from "react-hot-toast";

type FormValues = {
  email: string;
  username: string;
  business: string; // for the select
  active: number; // for the select
  phone: string;
  first: string;
  last: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errors: Record<string, any> = {};

  if (!values.email) {
    errors.email = {
      type: "required",
      message: "This is required.",
    };
  }

  if (!values.username) {
    errors.username = {
      type: "required",
      message: "This is required.",
    };
  }

  if (!values.business) {
    errors.business = {
      type: "required",
      message: "This is required.",
    };
  }

  if (!values.active) {
    errors.active = {
      type: "required",
      message: "This is required.",
    };
  }

  if (!values.phone) {
    errors.phone = {
      type: "required",
      message: "This is required.",
    };
  }

  if (!values.first) {
    errors.first = {
      type: "required",
      message: "This is required.",
    };
  }
  if (!values.last) {
    errors.last = {
      type: "required",
      message: "This is required.",
    };
  }

  return {
    values: Object.keys(errors).length ? {} : values,
    errors,
  };
};

function Users() {
  const dispatch = useDispatch();

  const businesses = useSelector((state: RootState) => state.business);
  const actives = useSelector((state: RootState) => state.active);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const { start, data, totalItems, totalPages } = useUsers(currentPage);

  function setPage(num: number) {
    searchParams.set("page", String(num));
    setSearchParams(searchParams);
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit((data) => {
    const user: User = {
      id: String(Date.now()),
      email: data.email,
      username: data.username,
      phoneNumber: data.phone,
      firstName: data.first,
      lastName: data.last,
      businessUnitId: data.business,
      activeDirectoryId: data.active,
    };

    reset();
    dispatch(addUser(user));
    toast.success(`User added successfully`);
  });

  return (
    <div className="px-24 py-14 w-full">
      <div>
        <h1 className="border-b-4 text-[27px] font-bold pr-4 w-fit border-b-yellow-500">
          USERS
        </h1>

        <Table
          columns={[
            "Username",
            "Email",
            "Phone",
            "Active directory id",
            "Business unit id",
            "",
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
        />
      </div>

      <div className="mt-18">
        <h1 className="border-b-4 text-[27px] font-bold pr-4 w-fit border-b-yellow-500">
          CREATE ACTIVE DIRECTORIES
        </h1>

        <form onSubmit={onSubmit} className="mt-10 flex flex-col gap-5">
          <div className="flex gap-5 w-[30%] justify-between">
            <label>First name :</label>
            <div className="w-[70%]">
              <input
                {...register("first")}
                type="text"
                className="focus:outline-none rounded bg-gray-50 border-b-2 border-b-yellow-500 px-3 py-1 w-full"
              />
              {errors?.first && (
                <p className="text-red-600">{errors.first.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-5 w-[30%] justify-between">
            <label>Last name :</label>
            <div className="w-[70%]">
              <input
                {...register("last")}
                type="text"
                className="focus:outline-none rounded bg-gray-50 border-b-2 border-b-yellow-500 px-3 py-1 w-full"
              />
              {errors?.last && (
                <p className="text-red-600">{errors.last.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-5 w-[30%] justify-between">
            <label>Username :</label>
            <div className="w-[70%]">
              <input
                {...register("username")}
                type="text"
                className="focus:outline-none rounded bg-gray-50 border-b-2 border-b-yellow-500 px-3 py-1 w-full"
              />
              {errors?.username && (
                <p className="text-red-600">{errors.username.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-5 w-[30%] justify-between">
            <label>Email :</label>
            <div className="w-[70%]">
              <input
                {...register("email")}
                type="text"
                className="focus:outline-none rounded bg-gray-50 border-b-2 border-b-yellow-500 px-3 py-1 w-full"
              />
              {errors?.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-5 w-[30%] justify-between">
            <label>Phone number :</label>
            <div className="w-[60%]">
              <input
                {...register("phone")}
                type="text"
                className="focus:outline-none rounded bg-gray-50 border-b-2 border-b-yellow-500 px-3 py-1 w-full"
              />
              {errors?.phone && (
                <p className="text-red-600">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-5 w-[30%] justify-between">
            <label>Business unit :</label>
            <div className="w-[60%]">
              <select
                {...register("business")}
                className="focus:outline-none rounded bg-gray-50 border-b-2 border-b-yellow-500 px-3 py-1 w-full"
              >
                <option value="">-- Select business unit --</option>
                {businesses.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors?.business && (
                <p className="text-red-600">{errors.business.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-5 w-[30%] justify-between">
            <label>Active directory :</label>
            <div className="w-[60%]">
              <select
                {...register("active")}
                className="focus:outline-none rounded bg-gray-50 border-b-2 border-b-yellow-500 px-3 py-1 w-full"
              >
                <option value="">-- Select active directory --</option>
                {actives.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors?.active && (
                <p className="text-red-600">{errors.active.message}</p>
              )}
            </div>
          </div>

          <div className="flex w-[30%] justify-end">
            <input
              type="submit"
              className="px-4 py-1 bg-yellow-500 rounded text-white font-bold cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Users;
