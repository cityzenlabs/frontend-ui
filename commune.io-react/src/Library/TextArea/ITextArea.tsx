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
        className="h-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      ></textarea>
    </div>
  );
};

export default ITextArea;
