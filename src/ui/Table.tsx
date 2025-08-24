/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  deleteActive,
  selectActiveNameById,
  type Active,
} from "../slices/activeSlice";
import {
  deleteBusiness,
  selectBusinessNameById,
  type Business,
} from "../slices/businessSlice";
import { deleteUser, type User } from "../slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import Button from "./Button";
import UserModal from "./UserModal";
import ActiveModal from "./ActiveModal";
import BusinessModal from "./BusinessModal";

type TableProps = {
  columns: string[];
  fields: string[];
  data: User[] | Active[] | Business[] | [];
  type: string;
};

function Table({ columns, fields, data, type }: TableProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [activeModalOpen, setActiveModalOpen] = useState(false);
  const [businessModalOpen, setBusinessModalOpen] = useState(false);

  const [modalAction, setModalAction] = useState<() => void>(() => {});
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const openModal = (title: string, message: string, action: () => void) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalAction(() => action);
    setModalOpen(true);
  };

  const dispatch = useDispatch();

  const businessList = useSelector((state: any) => state.business);
  const activeList = useSelector((state: any) => state.active);

  const [editingRow, setEditingRow] = useState<any | null>(null);

  return (
    <div className="rounded-lg overflow-hidden mt-10 w-full">
      <div className="w-full text-sm">
        <div>
          <div className="font-bold uppercase text-[14px] dark:text-white text-black flex w-full">
            {columns.map((column, index) => (
              <div
                key={index}
                className={`
                  px-4 py-3 text-left gap-2 flex 
                  ${index === 0 && type === "user" ? "basis-[15%]" : ""}
                  ${index === 0 && type !== "user" ? "basis-[40%]" : ""}
                  ${index === 1 && type === "user" ? "basis-[20%]" : ""}
                  ${index === 1 && type !== "user" ? "basis-[40%]" : ""}
                  ${index === 2 && type === "user" ? "basis-[15%]" : ""}
                  ${index === 2 && type !== "user" ? "basis-[20%]" : ""}
                  ${index === 3 ? "basis-[20%]" : ""}
                  ${index === 4 ? "basis-[15%]" : ""}
                  ${index === 5 ? "basis-[15%]" : ""}
                `}
              >
                {column}
              </div>
            ))}
          </div>
        </div>
        <div>
          {data?.length > 0 ? (
            data?.map((row, rowIndex) => {
              console.log(row);
              return (
                <div
                  className="bg-white dark:bg-[#1a273b] dark:text-white rounded shadow mb-2 flex text-[15px] items-center py-1 border-l-2 border-yellow-500 dark:border-yellow-600"
                  key={rowIndex}
                >
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
                      <div
                        key={colIndex}
                        className={`
                          px-4 py-3 text-left
                          ${
                            colIndex === 0 && type === "user"
                              ? "basis-[15%]"
                              : ""
                          }
                          ${
                            colIndex === 0 && type !== "user"
                              ? "basis-[40%]"
                              : ""
                          }
                          ${
                            colIndex === 1 && type === "user"
                              ? "basis-[20%]"
                              : ""
                          }
                          ${
                            colIndex === 1 && type !== "user"
                              ? "basis-[40%]"
                              : ""
                          }
                          ${colIndex === 2 ? "basis-[15%]" : ""}
                          ${colIndex === 3 ? "basis-[20%]" : ""}
                          ${colIndex === 4 ? "basis-[15%]" : ""}
                        `}
                      >
                        {String(value ?? "-")}
                      </div>
                    );
                  })}

                  <div className="flex gap-3 items-center justify-start px-4 py-3 basis-[15%]">
                    <Button
                      className="px-2 py-1 w-[48%] bg-yellow-500 dark:bg-yellow-600 text-white rounded"
                      onSubmit={() => {
                        if (type === "user") {
                          setEditingRow(row);
                          setUserModalOpen(true);
                        }
                        if (type === "active") {
                          setEditingRow(row);
                          setActiveModalOpen(true);
                        }
                        if (type === "business") {
                          setEditingRow(row);
                          setBusinessModalOpen(true);
                        }
                      }}
                    >
                      Edit
                    </Button>
                    <button
                      className="px-2 py-1 w-[48%] bg-red-500 dark:bg-red-800 text-white rounded"
                      onClick={() => {
                        if (type === "user") {
                          openModal(
                            "Remove user",
                            `Are you sure you want to remove the user ?`,
                            () => dispatch(deleteUser(String(row.id)))
                          );
                        }
                        if (type === "active") {
                          openModal(
                            "Remove active directory",
                            `Are you sure you want to remove active directory ?`,
                            () => dispatch(deleteActive(Number(row.id)))
                          );
                        }
                        if (type === "business") {
                          openModal(
                            "Remove business unit",
                            `Are you sure you want to remove the business unit ?`,
                            () => dispatch(deleteBusiness(String(row.id)))
                          );
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
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
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        title={modalTitle}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          modalAction();
          setModalOpen(false);
        }}
      >
        {modalMessage}
      </Modal>

      <UserModal
        isOpen={userModalOpen}
        onClose={() => {
          setUserModalOpen(false);
          setEditingRow(null);
        }}
        defaultValues={{
          email: editingRow?.email,
          username: editingRow?.username,
          business: editingRow?.businessUnitId,
          active: editingRow?.activeDirectoryId,
          phone: editingRow?.phoneNumber,
          first: editingRow?.firstName,
          last: editingRow?.lastName,
        }}
        userId={editingRow?.id}
      />

      <ActiveModal
        isOpen={activeModalOpen}
        onClose={() => {
          setActiveModalOpen(false);
          setEditingRow(null);
        }}
        defaultValues={{
          name: editingRow?.name,
          desc: editingRow?.description,
        }}
        activeId={editingRow?.id}
      />

      <BusinessModal
        isOpen={businessModalOpen}
        onClose={() => {
          setBusinessModalOpen(false);
          setEditingRow(null);
        }}
        defaultValues={{
          name: editingRow?.name,
          code: editingRow?.code,
        }}
        businessId={editingRow?.id}
      />
    </div>
  );
}

export default Table;
