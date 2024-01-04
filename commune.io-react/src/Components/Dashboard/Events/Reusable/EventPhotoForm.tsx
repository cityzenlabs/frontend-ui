import React from "react";
import IGallery from "../../../../Library/Gallery/IGallery";

function EventPhotoForm({ imageFiles, handleImageChange, picture }: any) {
  return (
    <div>
      <div className="pb-4">
        <IGallery
          imageFiles={imageFiles}
          onImageChange={handleImageChange}
          picture={picture}
        />
      </div>
    </div>
  );
}

export default EventPhotoForm;
