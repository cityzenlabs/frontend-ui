import React from "react";

interface ITextAreaProps {
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ITextArea: React.FC<ITextAreaProps> = ({
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div>
      <div className="mb-1 font-thin">Description</div>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder} // Include the placeholder attribute here
        className="w-full h-[200px] rounded-2xl font-medium text-black text-md bg-white border px-6 mr-4"
      ></textarea>
    </div>
  );
};

export default ITextArea;
