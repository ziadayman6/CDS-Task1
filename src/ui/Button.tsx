import type {
  ButtonHTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
} from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  onSubmit: MouseEventHandler<HTMLButtonElement>;
  width?: number;
}

function Button({ onSubmit, width, children, ...props }: ButtonProps) {
  return (
    <button
      onClick={onSubmit}
      className={`focus:outline-none dark:bg-yellow-600 focus:border-none cursor-pointer mt-5 rounded bg-yellow-600 text-white text-lg py-1 w-[${width}%]`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
