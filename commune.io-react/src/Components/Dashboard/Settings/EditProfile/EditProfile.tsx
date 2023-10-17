import React, {
  ChangeEvent,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import IInput from "../../../../Library/Input/IInput";
import * as UserService from "../../../../Services/UserService/UserService";

interface EditProfileProps {
  setUser: Dispatch<SetStateAction<any>>;
  userId: string;
  user: any;
  profilePicture: string;
}

function isEmptyOrWhitespace(value: any) {
  return /^\s*$/.test(value);
}

function EditProfile({
  setUser,
  userId,
  user,
  profilePicture,
}: EditProfileProps) {
  // Initialize image state with profilePicture prop
  const [image, setImage] = useState<string>(profilePicture);
  const [firstName, setFirstName] = useState<string>(user?.firstName || "");
  const [lastName, setLastName] = useState<string>(user?.lastName || "");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [state, setState] = useState<string>(user?.state || "");
  const [city, setCity] = useState<string>(user?.city || "");
  const [phoneNumber, setPhoneNumber] = useState<string>(
    user?.phoneNumber || "",
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setCity("");
    setState("");
  };

  const handleEditProfile = async (): Promise<void> => {
    try {
      if (email !== "") {
        await UserService.updateEmail(userId, email);
      }
      if (phoneNumber !== "") {
        await UserService.updatePhoneNumber(userId, phoneNumber);
      }
      const fieldsToUpdate: any = {
        firstName,
        lastName,
        city,
        state,
      };

      // Update the user?'s profile
      const nonEmptyFields: { [key: string]: string } = {};
      for (const [key, value] of Object.entries(fieldsToUpdate)) {
        if (typeof value === "string" && value.trim() !== "") {
          nonEmptyFields[key] = value;
        }
      }

      // Only make the API call if there are non-empty fields to update
      if (Object.keys(nonEmptyFields).length > 0) {
        const updatedUser = await UserService.updateProfileInfo(
          userId,
          nonEmptyFields,
        );

        // Update the user state
        setUser(updatedUser);
        resetForm();
      }
    } catch (error) {
      console.error("Error during profile edit:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <div className="relative w-20 h-20">
          {profilePicture && profilePicture !== "" ? ( // Check if profilePicture prop is not an empty string
            <img
              src={profilePicture} // Use profilePicture as the image source
              alt="Profile"
              className="rounded-full w-full h-full object-cover"
            />
          ) : (
            <div className="rounded-full border text-[#5081FF] w-full h-full flex items-center justify-center font-thin text-3xl bg-[#C7D5FB]">
              +
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        <div className="ml-4 text-sm mt-2 font-light text-slate-500">
          Picture should be in JPEG or PNG format <br /> Minimum resolution is
          200x200 pixels
          <div className="mt-2">
            <button
              onClick={handleUploadClick}
              className="ml-auto text-black text-sm border rounded py-1 px-4 mr-3"
            >
              Upload
            </button>
            <button className="ml-auto text-black text-sm border rounded py-1 px-4">
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-rows xl:w-2/5 lg:w-2/5 w-full">
        <div className="mt-10">
          <IInput
            name="firstName"
            label="First Name"
            placeholder={user?.firstName}
            value={firstName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFirstName(e.target.value)
            }
          />
        </div>
        <div className="mt-5">
          <IInput
            name="lastName"
            label="Last Name"
            placeholder={user?.lastName}
            value={lastName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLastName(e.target.value)
            }
          />
        </div>
        <div className="mt-5">
          <IInput
            name="email"
            label="Email"
            placeholder={user?.email}
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>
        <div className="mt-5">
          <IInput
            name="phoneNumber"
            label="Phone Number"
            placeholder={user?.phoneNumber}
            value={phoneNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPhoneNumber(e.target.value)
            }
          />
        </div>
        <div className="mt-4">Location</div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <IInput
              name="city"
              placeholder={user?.city}
              value={city}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCity(e.target.value)
              }
            />
          </div>
          <div>
            <IInput
              name="state"
              placeholder={user?.state}
              value={state}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setState(e.target.value)
              }
            />
          </div>
        </div>
        <div className="mt-4">
          <button className="text-[#E2224D]">Delete account</button>
        </div>
        <div className="mt-8">
          <button
            className="rounded-2xl font-light text-white text-md bg-regal-blue py-3 px-4"
            onClick={handleEditProfile}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
