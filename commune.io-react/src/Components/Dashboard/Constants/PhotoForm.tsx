import React from "react";
import IGallery from "../../../Library/Gallery/IGallery";

function PhotoForm({ imageFiles, handleImageChange }: any) {
  return (
    <div>
      <IGallery imageFiles={imageFiles} onImageChange={handleImageChange} />
    </div>
  );
}

export default PhotoForm;
