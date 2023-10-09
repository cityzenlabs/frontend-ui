import React, { useState } from "react";
import IInput from "../../../../Library/Input/IInput";

function EditProfile() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div>
      <div className="flex items-center ">
        <div className="relative w-20 h-20 ">
          {image ? (
            <img
              src={image}
              alt="Selected"
              className="rounded-full w-full h-full object-cover"
            />
          ) : (
            <div className="rounded-full border text-[#5081FF] w-full h-full flex items-center justify-center font-thin text-3xl bg-[#C7D5FB]">
              +
            </div>
          )}
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer rounded-full"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        <div className="ml-4 text-sm mt-2 font-light text-slate-500 ">
          Picture should be in JPEG or PNG format <br /> Minimum resolution is
          200x200 pixels
          <div className="mt-2">
            <button className="ml-auto text-black text-sm border rounded py-1 px-4 mr-3">
              Upload
            </button>
            <button className="ml-auto text-black text-sm border rounded py-1 px-4">
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-rows xl:w-1/2 lg:w-1/2 w-full">
        <div className="mt-10">
          <IInput name="firstName" label="First Name" placeholder="Alex" />
        </div>
        <div className="mt-5">
          <IInput name="lastName" label="Last Name" placeholder="Costa" />
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
