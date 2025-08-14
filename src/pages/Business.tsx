import { useSearchParams } from "react-router-dom";
import { useBusinesses } from "../hooks/business";
import Pagination from "../ui/Pagination";
import Table from "../ui/Table";
import { type Resolver, useForm } from "react-hook-form";
import { addBusiness, type Business } from "../slices/businessSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type FormValues = {
  name: string;
  code: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errors: Record<string, any> = {};

  if (!values.name) {
    errors.name = {
      type: "required",
      message: "This is required.",
    };
  }

  if (!values.code) {
    errors.code = {
      type: "required",
      message: "This is required.",
    };
  }

  return {
    values: Object.keys(errors).length ? {} : values,
    errors,
  };
};

function Businesss() {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const { start, data, totalItems, totalPages } = useBusinesses(currentPage);

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
    const business: Business = {
      id: String(Date.now()),
      name: data.name,
      code: data.code,
    };

    reset();
    dispatch(addBusiness(business));
    toast.success("Business unit added sucessfully");
  });

  return (
    <div className="px-24 py-14 w-full">
      <div>
        <h1 className="border-b-4 text-[27px] font-bold pr-4 w-fit border-b-yellow-500">
          BUSINESS UNITS
        </h1>

        <Table
          columns={["Id", "Name", "Code", ""]}
          fields={["id", "name", "code"]}
          data={data}
          type="business"
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
          CREATE BUSINESS UNIT
        </h1>

        <form onSubmit={onSubmit} className="mt-10 flex flex-col gap-5">
          <div className="flex gap-5 w-[30%] justify-between">
            <label>Name :</label>
            <div className="w-[70%]">
              <input
                {...register("name")}
                type="text"
                className="focus:outline-none rounded bg-gray-50 border-b-2 border-b-yellow-500 px-3 py-1 w-full"
              />
              {errors?.name && (
                <p className="text-red-600">{errors.name.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-5 w-[30%] justify-between">
            <label>Code :</label>
            <div className="w-[70%]">
              <input
                {...register("code")}
                type="text"
                className="focus:outline-none rounded bg-gray-50 border-b-2 border-b-yellow-500 px-3 py-1 w-full"
              />
              {errors?.code && (
                <p className="text-red-600">{errors.code.message}</p>
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

export default Businesss;
