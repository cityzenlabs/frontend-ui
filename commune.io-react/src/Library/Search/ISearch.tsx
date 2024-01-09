import React, { useState } from "react";
import { FilterIcon } from "@heroicons/react/outline";

function ISearch({ handleSearch }: any) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [selectedPrivacy, setSelectedPrivacy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const attributes = [
    "Social",
    "Intelligence",
    "Fitness",
    "Nightlife",
    "Culture",
    "Adventure",
  ];
  const privacies = ["Public", "Private"];

  const handleFilterClick = () => setShowFilters(!showFilters);

  const handleAttributeClick = (attribute: any) => {
    setSelectedAttribute(selectedAttribute === attribute ? "" : attribute);
  };

  const handlePrivacyClick = (privacy: any) => {
    setSelectedPrivacy(selectedPrivacy === privacy ? "" : privacy);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleSearch(
      searchTerm,
      selectedPrivacy.toUpperCase(),
      selectedAttribute.toUpperCase(),
    );
    setShowFilters(false); // Ensuring the filter panel closes only when the search is actually performed
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <div className="relative flex-grow mr-2">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 19l-3.5-3.5"></path>
            <path d="M11 18a7 7 0 100-14 7 7 0 000 14z"></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full pl-10 pr-10 text-xs text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          autoComplete="off"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          onClick={handleFilterClick}
        >
          <FilterIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
        {showFilters && (
          <div className="absolute right-0 mt-2 px-4 pt-4 pb-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 w-[205px]">
            <div className="text-xs font-medium text-gray-900 mb-3">
              ATTRIBUTE
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {attributes.map((attribute) => (
                <button
                  key={attribute}
                  className={`py-1 px-3 min-w-max rounded-lg text-xs font-medium focus:outline-none transition-colors whitespace-nowrap ${
                    selectedAttribute === attribute
                      ? "bg-blue-500 text-white"
                      : "border text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => handleAttributeClick(attribute)}
                >
                  {attribute}
                </button>
              ))}
            </div>
            <div className="text-xs font-medium text-gray-900 mb-3">
              PRIVACY
            </div>
            <div className="flex gap-3 mb-2">
              {privacies.map((privacy) => (
                <button
                  key={privacy}
                  className={`py-1 px-2 rounded-lg text-xs font-medium focus:outline-none transition-colors ${
                    selectedPrivacy === privacy
                      ? "bg-blue-500 text-white"
                      : "border text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => handlePrivacyClick(privacy)}
                >
                  {privacy}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

export default ISearch;
