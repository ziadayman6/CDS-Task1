import { type ReactNode } from "react";

interface Props {
  children?: ReactNode;
  value: string;
  setValue: (val: string) => void;
}

function TextInput({ children, value, setValue }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-lg dark:text-white max-sm:text-[16px]">{children}</label>
      <input
        className="focus:outline-none dark:border-b-yellow-600 max-sm:text-[16px]  rounded dark:text-white dark:bg-[#0f181f] bg-white border-b-2 border-b-yellow-500 text-lg px-3 py-1"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default TextInput;
