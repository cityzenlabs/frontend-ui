import React from "react";
import IGallery from "../../../../Library/Gallery/IGallery";

function EventPhotoForm({ imageFiles, handleImageChange }: any) {
  return (
    <div>
      <div className="pb-4">
        <IGallery imageFiles={imageFiles} onImageChange={handleImageChange} />
      </div>
    </div>
  );
}

export default EventPhotoForm;
