import React from "react";

function IGallery({ imageFiles, onImageChange, picture }: any) {
  // Determine whether to show the existing picture or the uploaded images
  const imagesToShow = imageFiles.length > 0 ? imageFiles : [picture];

  return (
    <div>
      <div className="flex w-full justify-center">
        <div className="flex items-center justify-center border rounded w-[200px] h-[128px] mr-4 md:mb-4">
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

        {imagesToShow.map((image: any, index: any) => {
          const imageUrl =
            image instanceof File ? URL.createObjectURL(image) : image;
          return (
            <div
              key={index}
              className="flex items-center justify-center rounded w-[200px] h-[128px] mr-4 mb-4"
            >
              <img
                src={imageUrl}
                alt={`Uploaded content ${index}`}
                className="w-full h-full object-cover rounded"
                onLoad={() =>
                  image instanceof File && URL.revokeObjectURL(imageUrl)
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default IGallery;
