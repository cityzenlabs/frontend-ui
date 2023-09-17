import React, { useState } from "react";
import IListBox from "../../../Library/ListBox/IListBox";

interface DetailFormProps {
  onNextStep: () => void;
}

function DetailForm({ onNextStep }: DetailFormProps) {
  const [image, setImage] = useState<string | null>(null); // Initialize image state as null

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          if (img.width >= 200 && img.height >= 200) {
            setImage(reader.result as string);
          } else {
            alert("Image must have a minimum resolution of 200x200 pixels.");
          }
        };
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleContinue = (): void => {
    onNextStep();
  };

  const containerStyle: React.CSSProperties = {
    width: "60px", // Adjust the size of the container as needed
    height: "60px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: image ? `url(${image}) center/cover no-repeat` : "#C7D5FB",
    cursor: "pointer",
  };

  return (
    <div>
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col" style={{ width: "350px" }}>
          <div className="mb-3 text-2xl font-medium">Details</div>
          <div className="flex">
            <div>
              <label className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <div style={containerStyle}>
                  {!image && (
                    <span className="text-regal-blue text-3xl font-light">
                      +
                    </span>
                  )}
                </div>
              </label>
            </div>
            <div>
              <div className="ml-2 text-sm mt-2 font-light text-slate-500">
                Picture should be in JPEG or PNG format Minimum resolution is
                200x200 pixels
              </div>
            </div>
          </div>
          <div className="mt-4">Location</div>
          <div className="grid grid-cols-2 gap-2">
            <input
              name="State"
              className=" mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 rounded-md sm:text-sm "
              placeholder="State"
            />
            <input
              name="City"
              className=" mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 rounded-md sm:text-sm "
              placeholder="City"
            />
          </div>

          <div>
            <button
              onClick={handleContinue}
              className="w-full rounded-2xl font-light text-white text-md bg-regal-blue py-2 px-8 border border-grey mt-6"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailForm;
