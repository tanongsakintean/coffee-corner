import type { ComponentProps } from "react";

export function PrimaryButton({ className = "", ...props }: ComponentProps<"button">) {
  return (
    <button
      {...props}
      className={`submit-button flex min-h-[50px] w-full items-center justify-center gap-2 rounded-[11px] bg-coffee px-5 text-label-lg font-bold text-white ${className}`}
    />
  );
}
