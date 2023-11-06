import React from "react";

interface IInputProps {
  name: string;
  placeholder: string;
  label?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function IInput({
  name,
  placeholder,
  label,
  type = "text",
  value,
  onChange,
}: IInputProps) {
  return (
    <div>
      {label && <div className="font-thin">{label}</div>}
      <input
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-2xl border py-2 px-6 focus:border-regal-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm placeholder-slate-400 focus:outline-none"
      />
    </div>
  );
}

export default IInput;
