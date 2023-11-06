import React from "react";

interface IBackButtonProps {
  onClick: () => void; // Callback function when the button is clicked
}

const IBackButton: React.FC<IBackButtonProps> = ({ onClick }) => {
  return (
    <button
      className="flex items-center space-x-1 px-2 py-1 text-slate-400 border bg-white rounded"
      onClick={onClick}
      aria-label="Back"
    >
      <div className="w-6 h-6 flex m-auto transform rotate-90">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="2 0 20 16"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6.293 4.293a1 1 0 011.414 0L12 8.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </button>
  );
};

export default IBackButton;
