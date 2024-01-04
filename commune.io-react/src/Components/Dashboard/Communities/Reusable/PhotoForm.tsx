import React from "react";
import IGallery from "../../../../Library/Gallery/IGallery";

function PhotoForm({ imageFiles, handleImageChange, picture }: any) {
  return (
    <div>
      <IGallery
        imageFiles={imageFiles}
        onImageChange={handleImageChange}
        picture={picture}
      />
    </div>
  );
}

export default PhotoForm;
