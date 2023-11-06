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
      <div className=" font-thin">Description</div>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className=" xl:w-[600px] w-full h-[200px] rounded-2xl font-medium text-black text-md bg-white border px-6 mr-4"
      ></textarea>
    </div>
  );
};

export default ITextArea;
