import React from "react";

function IToggleButton({ activeTab, onToggle }: any) {
  const handleToggle = (tab: any) => {
    onToggle(tab);
  };

  return (
    <div className="flex items-center rounded  p-1">
      <button
        className={`px-4 py-1 rounded ${
          activeTab === "Joined"
            ? "bg-regal-blue text-white text-sm"
            : "text-gray-500 text-sm"
        }`}
        onClick={() => handleToggle("Joined")}
      >
        Joined
      </button>
      <button
        className={`px-4 py-1 rounded-lg ${
          activeTab === "Created"
            ? "bg-regal-blue text-white text-sm"
            : "text-gray-500 text-sm"
        }`}
        onClick={() => handleToggle("Created")}
      >
        Created
      </button>
    </div>
  );
}

export default IToggleButton;
