"use client";

import { ChevronDown } from "lucide-react";
import type { ReactNode, SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children?: ReactNode;
  icon?: ReactNode;
};

export function Select({ className = "", children, icon, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        {...props}
        className={`appearance-none ${icon ? "pl-9" : ""} pr-9 ${className}`}
      >
        {children}
      </select>
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-[#767676] pointer-events-none">
          {icon}
        </span>
      )}
      <ChevronDown
        size={16}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#767676] pointer-events-none"
      />
    </div>
  );
}
