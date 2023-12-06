import React, {
  ChangeEvent,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import IInput from "../../../../Library/Input/IInput";
import * as UserService from "../../../../Services/UserService/UserService";
import IInputGroup from "../../../../Library/InputGroup/IInputGroup";
import IButton from "../../../../Library/Button/IButton";
import { useAuth } from "../../../../AuthContext";

interface EditProfileProps {
  setHome: Dispatch<SetStateAction<any>>;
  home: any;
  profilePicture: string;
}

function EditProfile({ setHome, home, profilePicture }: EditProfileProps) {
  const [image, setImage] = useState<string>(profilePicture);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const accessToken = useAuth();

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

  const deleteAccount = () => {};

  const handleEditProfile = async (): Promise<void> => {
    try {
      const fieldsToUpdate: any = {
        firstName,
        lastName,
        city,
        state,
        phoneNumber,
        email,
      };

      const nonEmptyFields: { [key: string]: string } = {};

      for (const [key, value] of Object.entries(fieldsToUpdate)) {
        if (typeof value === "string" && value.trim() !== "") {
          nonEmptyFields[key] = value;
        }
      }

      if (Object.keys(nonEmptyFields).length > 0) {
        const updatedUser = await UserService.updateProfileInfo(
          nonEmptyFields,
          accessToken.token,
        );
        setHome(updatedUser);
        resetForm();
      }

      const updatedUser = await UserService.fetchUserHome(accessToken.token);
      setHome(updatedUser);
      resetForm();
    } catch (error) {}
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

      <div className="xl:w-1/3 mt-10">
        <IInput
          name="firstName"
          label="First Name"
          placeholder={home.user?.firstName}
          value={firstName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFirstName(e.target.value)
          }
        />
      </div>

      <div className="xl:w-1/3 mt-4">
        <IInput
          name="lastName"
          label="Last Name"
          placeholder={home.user?.lastName}
          value={lastName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setLastName(e.target.value)
          }
        />
      </div>
      <div className="xl:w-1/3 mt-4">
        <IInput
          name="email"
          label="Email"
          placeholder={home.user?.email}
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
      </div>
      <div className="xl:w-1/3 mt-4">
        <IInput
          name="phoneNumber"
          label="Phone Number"
          placeholder={home.user?.phoneNumber}
          value={phoneNumber}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPhoneNumber(e.target.value)
          }
        />
      </div>
      <div className="xl:w-1/3 mt-4">
        <IInputGroup
          label="Location"
          inputs={[
            {
              name: "City",
              placeholder: home.user?.city,
              value: city,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setCity(e.target.value),
            },
            {
              name: "State",
              placeholder: home.user?.state,
              value: state,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setState(e.target.value),
            },
          ]}
        ></IInputGroup>
      </div>

      <div className="flex mt-10">
        <IButton
          onClick={handleEditProfile}
          text="Save Changes"
          bgColor="bg-regal-blue"
          textColor="text-white"
        />
        <IButton
          onClick={deleteAccount}
          text="Delete Account"
          bgColor="bg-[#E2224D]"
          textColor="text-white"
        />
      </div>
    </div>
  );
}

export default EditProfile;
