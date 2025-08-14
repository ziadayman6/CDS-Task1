import { useSearchParams } from "react-router-dom";
import { useActives } from "../hooks/active";
import Table from "../ui/Table";
import Pagination from "../ui/Pagination";
import { useForm, type Resolver } from "react-hook-form";
import { addActive, type Active } from "../slices/activeSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

type FormValues = {
  name: string;
  desc: string;
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

  if (!values.desc) {
    errors.desc = {
      type: "required",
      message: "This is required.",
    };
  }

  return {
    values: Object.keys(errors).length ? {} : values,
    errors,
  };
};

function Activee() {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const { start, data, totalItems, totalPages } = useActives(currentPage);

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
    const active: Active = {
      id: Date.now(),
      name: data.name,
      description: data.desc,
    };

    reset();
    dispatch(addActive(active));
    toast.success("Active directory added sucessfully");
  });

  return (
    <div className="px-24 py-14 w-full">
      <div>
        <h1 className="border-b-4 text-[27px] font-bold pr-4 w-fit border-b-yellow-500">
          ACTIVE DIRECTORIES
        </h1>

        <Table
          columns={["Id", "Name", "Description", ""]}
          fields={["id", "name", "description"]}
          data={data}
          type="active"
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
            <label>Description :</label>
            <div className="w-[70%]">
              <input
                {...register("desc")}
                type="text"
                className="focus:outline-none rounded bg-gray-50 border-b-2 border-b-yellow-500 px-3 py-1 w-full"
              />
              {errors?.desc && (
                <p className="text-red-600">{errors.desc.message}</p>
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

export default Activee;
