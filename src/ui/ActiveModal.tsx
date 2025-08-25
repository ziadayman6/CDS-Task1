import { useForm, type Resolver } from "react-hook-form";
import { addActive, updateActive, type Active } from "../slices/activeSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: FormValues | null;
  activeId?: number;
}

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

function ActiveModal({ isOpen, onClose, defaultValues, activeId }: ModalProps) {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver, defaultValues: defaultValues || {} });

  const onSubmit = handleSubmit((data) => {
    const active: Active = {
      id: activeId || Date.now(),
      name: data.name,
      description: data.desc,
    };

    if (defaultValues) {
      dispatch(updateActive(active));
      toast.success(`Active directory updated successfully`);
    } else {
      dispatch(addActive(active));
      toast.success(`Active directory added successfully`);
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
      <div className="bg-white dark:bg-[#1a273b] w-[60%] rounded-2xl border-b-4 border-b-yellow-500 dark:border-b-yellow-600 px-10 py-10 relative">
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
          {defaultValues ? t("editActive") : t("createActive")}
        </h1>

        <form onSubmit={onSubmit} className="mt-10 flex flex-col gap-5">
          <div className="flex gap-5 w-[60%] justify-between dark:text-white">
            <label>{t("name")}</label>
            <div className="w-[70%]">
              <input
                {...register("name")}
                type="text"
                className="focus:outline-none dark:border-b-yellow-600  rounded bg-gray-50 dark:bg-[#0f181f] border-b-2 border-b-yellow-500 px-3 py-1 w-full"
              />
              {errors?.name && (
                <p className="text-red-600">{errors.name.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-5 w-[60%] justify-between">
            <label className="dark:text-white">{t("description")}</label>
            <div className="w-[70%]">
              <input
                {...register("desc")}
                type="text"
                className="focus:outline-none dark:text-white dark:border-b-yellow-600  rounded bg-gray-50 dark:bg-[#0f181f] border-b-2 border-b-yellow-500 px-3 py-1 w-full"
              />
              {errors?.desc && (
                <p className="text-red-600">{errors.desc.message}</p>
              )}
            </div>
          </div>

          <div className="flex w-[60%] justify-end">
            <input
              type="submit"
              value={t("save")}
              className="px-4 py-1 w-[50%] bg-yellow-500 dark:bg-yellow-600 rounded text-white cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ActiveModal;
