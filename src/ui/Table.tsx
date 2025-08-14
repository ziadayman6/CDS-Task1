/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  deleteActive,
  selectActiveNameById,
  updateActive,
  type Active,
} from "../slices/activeSlice";
import {
  deleteBusiness,
  selectBusinessNameById,
  updateBusiness,
  type Business,
} from "../slices/businessSlice";
import { deleteUser, updateUser, type User } from "../slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

type TableProps = {
  columns: string[];
  fields: string[];
  data: User[] | Active[] | Business[] | [];
  type: string;
};

function Table({ columns, fields, data, type }: TableProps) {
  const dispatch = useDispatch();

  const businessList = useSelector((state: any) => state.business);
  const activeList = useSelector((state: any) => state.active);

  const [editingRow, setEditingRow] = useState<any | null>(null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: editingRow || {},
  });

  useEffect(() => {
    if (editingRow) reset(editingRow);
  }, [editingRow, reset]);

  const onSubmit = (formData: any) => {
    if (type === "user") dispatch(updateUser(formData));
    if (type === "active") dispatch(updateActive(formData));
    if (type === "business") dispatch(updateBusiness(formData));

    setEditingRow(null);
  };

  return (
    <div className="rounded-lg overflow-hidden mt-10 w-full">
      <table className="table-auto w-full text-sm">
        <thead>
          <tr className="bg-yellow-500 font-bold uppercase text-[13px] text-white">
            {columns.map((column, index) => {
              return (
                <th className="px-4 py-3" key={index}>
                  {column}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data?.map((row, rowIndex) => {
              const isEditing = editingRow?.id === row.id;

              return (
                <tr className="odd:bg-gray-100 even:bg-gray-300" key={rowIndex}>
                  {fields.map((field, colIndex) => {
                    let value = (row as Record<string, string | number | null>)[
                      field
                    ];

                    if (field === "businessUnitId" && value) {
                      value = selectBusinessNameById(
                        businessList,
                        String(value)
                      );
                    }

                    if (field === "activeDirectoryId" && value) {
                      value = selectActiveNameById(activeList, Number(value));
                    }

                    return (
                      <td key={colIndex} className="px-4 py-3 text-center">
                        {isEditing && field === "businessUnitId" && (
                          <select
                            {...register(field as any)}
                            className="border px-2 py-1 w-full"
                          >
                            <option value="">Select Business</option>
                            {businessList.map((b: any) => (
                              <option key={b.id} value={b.id}>
                                {b.name}
                              </option>
                            ))}
                          </select>
                        )}
                        {isEditing && field === "activeDirectoryId" && (
                          <select
                            {...register(field as any)}
                            className="border px-2 py-1 w-full"
                          >
                            <option value="">Select Active</option>
                            {activeList.map((b: any) => (
                              <option key={b.id} value={b.id}>
                                {b.name}
                              </option>
                            ))}
                          </select>
                        )}
                        {isEditing &&
                          field !== "businessUnitId" &&
                          field !== "activeDirectoryId" && (
                            <input
                              {...register(field as any)}
                              disabled={
                                (type === "active" || type === "business") &&
                                field === "id"
                              }
                              className="border px-2 py-1 w-full"
                            />
                          )}
                        {!isEditing && String(value ?? "-")}
                      </td>
                    );
                  })}

                  <td className="flex gap-3 items-center justify-center px-4 py-3">
                    {isEditing ? (
                      <>
                        <button
                          className="px-2 py-1 bg-green-500 text-white rounded"
                          onClick={handleSubmit(onSubmit)}
                        >
                          Save
                        </button>
                        <button
                          className="px-2 py-1 bg-gray-400 rounded"
                          onClick={() => setEditingRow(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="px-2 py-1 bg-yellow-500 rounded"
                          onClick={() => setEditingRow(row)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-2 py-1 bg-yellow-500 rounded"
                          onClick={() => {
                            if (type === "user")
                              dispatch(deleteUser(String(row.id)));
                            if (type === "active")
                              dispatch(deleteActive(Number(row.id)));
                            if (type === "business")
                              dispatch(deleteBusiness(String(row.id)));
                          }}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="bg-gray-100">
              <td
                colSpan={columns.length}
                className="px-4 py-3 text-center text-gray-500 uppercase"
              >
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
