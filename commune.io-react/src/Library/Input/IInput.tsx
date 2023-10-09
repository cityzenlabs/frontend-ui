import React from "react";

interface IInputProps {
  name: string;
  placeholder: string;
  label?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Adding this line
}

function IInput({
  name,
  placeholder,
  label,
  type,
  value,
  onChange,
}: IInputProps) {
  return (
    <div>
      <div className="font-light">{label}</div>
      <input
        name={name}
        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 "
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default IInput;
