import React from "react";

interface IGalleryProps {
  imageFiles: File[];
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function IGallery({ imageFiles, onImageChange }: IGalleryProps) {
  return (
    <div>
      <div className=" mb-1 font-thin">Picture</div>
      <div className="flex w-full flex-wrap">
        <div className="flex items-center justify-center border rounded w-[220px] h-[128px] mr-4 md:mb-4">
          <label className="flex flex-col items-center justify-center mx-4 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageChange}
              multiple
            />
            <span className="text-regal-blue text-4xl font-light">+</span>
            <div>Add Image</div>
          </label>
        </div>
        {imageFiles.map((imageFile, index) => {
          const imageUrl = URL.createObjectURL(imageFile);
          return (
            <div
              key={index}
              className="flex items-center justify-center rounded w-[220px] h-[128px] mr-4 mb-4"
            >
              <img
                src={imageUrl}
                alt={`Uploaded content ${index}`}
                className="w-full h-full object-cover rounded"
                onLoad={() => URL.revokeObjectURL(imageUrl)} // Revoke the object URL after the image has loaded
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default IGallery;
