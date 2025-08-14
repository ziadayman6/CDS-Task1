import type { MouseEventHandler } from "react";

interface ButtonProps {
  onSubmit: MouseEventHandler<HTMLButtonElement>;
}

function Button({ onSubmit }: ButtonProps) {
  return (
    <button
      onClick={onSubmit}
      className="focus:outline-none focus:border-none cursor-pointer mt-5 rounded bg-yellow-600 text-white font-bold text-lg py-1"
    >
      LOGIN
    </button>
  );
}

export default Button;
