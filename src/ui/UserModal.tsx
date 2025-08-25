import { useForm, type Resolver } from "react-hook-form";
import toast from "react-hot-toast";
import { addUser, updateUser, type User } from "../slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: FormValues | null;
  userId?: string;
}

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

function UserModal({ isOpen, onClose, defaultValues, userId }: ModalProps) {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const businesses = useSelector((state: RootState) => state.business);
  const actives = useSelector((state: RootState) => state.active);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver, defaultValues: defaultValues || {} });

  const onSubmit = handleSubmit((data) => {
    const user: User = {
      id: userId || String(Date.now()),
      email: data.email,
      username: data.username,
      phoneNumber: data.phone,
      firstName: data.first,
      lastName: data.last,
      businessUnitId: data.business,
      activeDirectoryId: data.active,
    };

    if (defaultValues) {
      dispatch(updateUser(user));
      toast.success(`User updated successfully`);
    } else {
      dispatch(addUser(user));
      toast.success(`User added successfully`);
    }

    onClose();
    reset();
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
      <div className="bg-white dark:bg-[#1a273b] w-[60%] rounded-2xl border-b-4 border-b-yellow-500 dark:border-b-yellow-600 px-15 py-10 relative">
        <button
          onClick={onClose}
          className={`absolute top-4 ${
            i18n.language === "ar" ? "left-6" : "right-6"
          } text-black hover:text-red-600 dark:text-white dark:hover:text-red-800 text-2xl font-bold`}
        >
          X
        </button>

        <h1
          className={`border-b-4 text-[27px] dark:text-white font-bold ${
            i18n.language === "en" ? "pr-4" : "pl-4"
          } w-fit border-b-yellow-500 dark:border-b-yellow-600`}
        >
          {defaultValues ? t("editUser") : t("createUser")}
        </h1>

        <form
          onSubmit={onSubmit}
          className="mt-10 flex flex-col gap-5 dark:text-white"
        >
          <div className="flex gap-5 w-[60%] justify-between ">
            <label>{t("firstName")}</label>
            <div className="w-[70%]">
              <input
                {...register("first")}
                type="text"
                className="focus:outline-none dark:border-b-yellow-600  rounded bg-gray-50 dark:bg-[#0f181f] border-b-2 border-b-yellow-500 px-3 py-1 w-full"
              />
              {errors?.first && (
                <p className="text-red-600">{errors.first.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-5 w-[60%] justify-between">
            <label>{t("lastName")}</label>
            <div className="w-[70%]">
              <input
                {...register("last")}
                type="text"
                className="focus:outline-none dark:border-b-yellow-600 rounded bg-gray-50 border-b-2 dark:bg-[#0f181f] border-b-yellow-500 px-3 py-1 w-full"
              />
              {errors?.last && (
                <p className="text-red-600">{errors.last.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-5 w-[60%] justify-between">
            <label>{t("username")}</label>
            <div className="w-[70%]">
              <input
                {...register("username")}
                type="text"
                className="focus:outline-none dark:border-b-yellow-600 rounded bg-gray-50 dark:bg-[#0f181f] border-b-2 border-b-yellow-500 px-3 py-1 w-full"
              />
              {errors?.username && (
                <p className="text-red-600">{errors.username.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-5 w-[60%] justify-between">
            <label>{t("email")}</label>
            <div className="w-[70%]">
              <input
                {...register("email")}
                type="text"
                className="focus:outline-none dark:border-b-yellow-600 rounded bg-gray-50 dark:bg-[#0f181f] border-b-2 border-b-yellow-500 px-3 py-1 w-full"
              />
              {errors?.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-5 w-[60%] justify-between">
            <label>{t("phone")}</label>
            <div className="w-[70%]">
              <input
                {...register("phone")}
                type="text"
                className="focus:outline-none dark:border-b-yellow-600 rounded bg-gray-50 dark:bg-[#0f181f] border-b-2 border-b-yellow-500 px-3 py-1 w-full"
              />
              {errors?.phone && (
                <p className="text-red-600">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-5 w-[60%] justify-between">
            <label>{t("businessUnit")}</label>
            <div className="w-[70%]">
              <select
                {...register("business")}
                className="focus:outline-none dark:border-b-yellow-600 rounded bg-gray-50 dark:bg-[#0f181f] border-b-2 border-b-yellow-500 px-3 py-1 w-full"
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

          <div className="flex gap-5 w-[60%] justify-between">
            <label>{t("activeDirectory")}</label>
            <div className="w-[70%]">
              <select
                {...register("active")}
                className="focus:outline-none dark:border-b-yellow-600 rounded bg-gray-50 dark:bg-[#0f181f] border-b-2 border-b-yellow-500 px-3 py-1 w-full"
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

          <div className="flex w-[60%] justify-end">
            <input
              type="submit"
              value={t("save")}
              className="px-4 py-1 w-[50%] dark:bg-yellow-600 bg-yellow-500 rounded text-white cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserModal;
