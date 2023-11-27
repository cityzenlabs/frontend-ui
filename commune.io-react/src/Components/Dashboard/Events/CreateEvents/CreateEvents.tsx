import React, { useState } from "react";
import { EventsProps } from "../types/EventsProps";
import { Visibility } from "../Enums/EventEnums";

function CreateEvents({ setEventsVisibility }: EventsProps) {
  const attributes = [
    { label: "Social", id: 1 },
    { label: "Intelligence", id: 2 },
    { label: "Professional", id: 3 },
    { label: "Wellness", id: 4 },
    { label: "Adventure", id: 5 },
    { label: "Culture", id: 6 },
    { label: "Other", id: 7 },
  ];

  const tags = [
    { label: "Tags", id: 1 },
    { label: "Tags", id: 2 },
    { label: "Tags", id: 3 },
    { label: "Tags", id: 4 },
    { label: "Tags", id: 5 },
    { label: "Tags", id: 6 },
    { label: "Tags", id: 7 },
  ];

  const locationData = [
    { label: "Address", id: 1 },
    { label: "City", id: 2 },
    { label: "State", id: 3 },
    { label: "Zipcode", id: 4 },
  ];

  const dateData = [
    { label: "DD", id: 1 },
    { label: "MM", id: 2 },
    { label: "YYYY", id: 3 },
  ];

  const time = [
    { label: "00:00", id: 1 },
    { label: "00:00", id: 2 },
  ];

  const [privacy, setPrivacy] = useState("Public");
  const [selectedAttributes, setSelectedAttributes] = useState<number[]>([]); // Use numbers to store selected attribute IDs
  const [selectedTags, setSelectedTags] = useState<number[]>([]); // Use numbers to store selected tag IDs

  const handlePrivacyButtonClick = (value: string) => {
    setPrivacy(value);
  };

  const handleAttributeButtonClick = (id: number) => {
    if (selectedAttributes.includes(id)) {
      setSelectedAttributes(
        selectedAttributes.filter((attrId) => attrId !== id),
      );
    } else {
      setSelectedAttributes([...selectedAttributes, id]);
    }
  };

  const handleTagButtonClick = (id: number) => {
    if (selectedTags.includes(id)) {
      setSelectedTags(selectedTags.filter((tagId) => tagId !== id));
    } else {
      setSelectedTags([...selectedTags, id]);
    }
  };

  const [imageFiles, setImageFiles] = useState<File[]>([]); // Initialize imageFiles state as an empty array

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImageFiles = e.target.files;
    if (selectedImageFiles) {
      // Convert the selected files to an array and set them in state
      setImageFiles([...imageFiles, ...Array.from(selectedImageFiles)]);
    }
  };

  return (
    <div className="py-8">
      <div className="flex xl:ml-[320px] md:ml-[320px] px-12 pb-8">
        <button
          className="flex items-center space-x-1 px-2 py-1 text-slate-400 border bg-white rounded"
          onClick={() => setEventsVisibility(Visibility.Events)}
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
        <label className="font-medium text-3xl ml-4">Create Events</label>
      </div>
      <div className="xl:ml-[320px] md:ml-[320px] px-12">
        <div className="xl:flex">
          <div>
            <div>Privacy</div>
            <button
              className={`mt-4 rounded-2xl font-light text-black text-md ${
                privacy === "Public"
                  ? "bg-regal-blue text-white"
                  : "bg-white text-black"
              } border py-2 px-6 mr-4`}
              onClick={() => handlePrivacyButtonClick("Public")}
            >
              Public
            </button>
            <button
              className={`mt-4 rounded-2xl font-light text-black text-md ${
                privacy === "Private"
                  ? "bg-regal-blue text-white"
                  : "bg-white text-black"
              } border py-2 px-6 mr-4`}
              onClick={() => handlePrivacyButtonClick("Private")}
            >
              Private
            </button>
          </div>{" "}
        </div>

        <div>
          <div className="mt-4">Details</div>{" "}
          <div>
            <input
              type="search"
              id="search"
              name="search"
              placeholder="Event Name"
              className="mt-4  rounded-2xl font-medium text-black text-md bg-white border py-2 px-6 mr-4"
            />
          </div>
        </div>
        <div>
          <div>
            <div className="mt-4">Location</div>
            {locationData.map((item) => (
              <input
                type="search"
                id="search"
                name="search"
                placeholder={item.label}
                className="mt-4  rounded-2xl font-medium text-black text-md bg-white border py-2 px-6 mr-4"
              />
            ))}
          </div>
        </div>
        <div>
          <div>
            <div className="mt-4 w-1/2">Date</div>
            {dateData.map((item) => (
              <input
                type="search"
                id="search"
                name="search"
                placeholder={item.label}
                className="mt-4 w-[125px]  rounded-2xl font-medium text-black text-md bg-white border py-2 px-6 mr-4"
              />
            ))}
          </div>
        </div>
        <div>
          <div>
            <div className="mt-4 w-1/2">Time</div>
            {time.map((item) => (
              <input
                type="search"
                id="search"
                name="search"
                placeholder={item.label}
                className="mt-4 w-[125px]  rounded-2xl font-medium text-black text-md bg-white border py-2 px-6 mr-4"
              />
            ))}
          </div>
        </div>
        <div>
          <div className="mt-4 w-1/2 ">Description</div>
          <textarea className="mt-4 w-full h-[200px]  rounded-2xl font-medium text-black text-md bg-white border px-6 mr-4"></textarea>
        </div>
        <div className="mt-4 mb-4">Gallery</div>
        <div className="flex w-full  flex-wrap">
          <div className="flex items-center justify-center border rounded w-[220px] h-[128px] mr-4 md:mb-4">
            <div>
              <label>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  multiple
                />
                <div className="flex flex-col items-center justify-center mx-4">
                  <span className="text-regal-blue text-4xl font-light">+</span>
                  <div>Add Image</div>
                </div>
              </label>
            </div>
          </div>
          {imageFiles.map((imageFile, index) => {
            const imageUrl = URL.createObjectURL(imageFile);

            return (
              <div
                key={index}
                className="flex items-center justify-center  rounded w-[220px] h-[128px] mr-4 mb-4 "
              >
                <img
                  src={imageUrl}
                  alt={`${index}`}
                  className="w-full h-full object-cover  rounded"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CreateEvents;
