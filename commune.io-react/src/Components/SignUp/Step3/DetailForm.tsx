import React from "react";
import IInput from "../../../Library/Input/IInput";

interface DetailFormProps {
  onNextStep: () => void;
  userData: any;
  updateUser: (updatedData: any) => void;
}

function DetailForm({ onNextStep, userData, updateUser }: DetailFormProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          if (img.width >= 200 && img.height >= 200) {
            updateUser({ ...userData, image: reader.result as string });
          } else {
            alert("Image must have a minimum resolution of 200x200 pixels.");
          }
        };
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const createUser = () => {
    return {
      authDto: {
        authType: "EMAIL",
        authIdentifier: userData.email,
        password: userData.password,
      },
      role: "USER",
      firstName: userData.firstName,
      lastName: userData.lastName,
      gender: userData.gender,
      city: userData.city,
      state: userData.state,
      picture: "",
      dateOfBirth: userData.year + "-" + userData.month + "-" + userData.day,
    };
  };

  const handleContinue = async (): Promise<void> => {
    if (userData.state && userData.city) {
      const user = createUser();

      try {
        const response = await fetch("http://localhost:8080/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        await response.json;
      } catch (error) {}
      onNextStep();
    } else {
      alert("Please complete the form before proceeding.");
    }
  };

  const containerStyle: React.CSSProperties = {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: userData.image
      ? `url(${userData.image}) center/cover no-repeat`
      : "#C7D5FB",
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
                  {!userData.image && (
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
            <div>
              <IInput
                name="state"
                placeholder="State"
                value={userData.state || ""}
                onChange={(e) =>
                  updateUser({ ...userData, state: e.target.value })
                }
              />
            </div>
            <div>
              <IInput
                name="city"
                placeholder="City"
                value={userData.city || ""}
                onChange={(e) =>
                  updateUser({ ...userData, city: e.target.value })
                }
              />
            </div>
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
