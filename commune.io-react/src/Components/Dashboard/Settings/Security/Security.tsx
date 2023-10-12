import React, { ChangeEvent, useState, useEffect } from "react";
import IInput from "../../../../Library/Input/IInput";

function Security() {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [slideState, setSlideState] = useState<"in" | "out" | "hidden">(
    "hidden",
  );

  const handlePasswordChange = async (): Promise<void> => {
    if (newPassword === confirmPassword) {
      try {
        const response = await fetch(
          "http://localhost:8080/app-service/users/6525fb76062b36551274b1ce/update-password",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              currentPassword: currentPassword,
              newPassword: newPassword,
            }),
          },
        );

        if (response.ok) {
          setMessage("Password updated successfully!");
          setIsError(false);
        } else {
          setMessage("Error updating password. Please try again.");
          setIsError(true);
        }
      } catch (error) {
        setMessage("An error occurred. Please try again later.");
        setIsError(true);
      }
    } else {
      setMessage("New Password and Confirm Password do not match!");
      setIsError(true);
    }
  };

  useEffect(() => {
    if (message) {
      setSlideState("in");
      const slideOutTimer = setTimeout(() => {
        setSlideState("out");
        const hideTimer = setTimeout(() => {
          setMessage(null);
          setSlideState("hidden");
        }, 500); // Assuming the slide-out duration is 500ms
        return () => clearTimeout(hideTimer);
      }, 4500); // Show for 4.5 seconds, then start slide-out

      return () => {
        clearTimeout(slideOutTimer);
      };
    }
  }, [message]);

  return (
    <div>
      <div className="grid grid-rows xl:w-2/5 lg:w-2/5 w-full">
        {message && (
          <div
            className={`fixed bottom-0 right-0 mb-4 p-4 text-center ${
              isError
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
            style={{
              transform:
                slideState === "in" ? "translateX(0%)" : "translateX(100%)",
              transition: "transform 500ms ease-in-out",
            }}
          >
            {message}
          </div>
        )}
        <div>
          <IInput
            name="currentPassword"
            label="Current Password"
            placeholder="************"
            value={currentPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCurrentPassword(e.target.value)
            }
          />
        </div>
        <div className="mt-5">
          <IInput
            name="newPassword"
            label="New Password"
            placeholder="************"
            value={newPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewPassword(e.target.value)
            }
          />
        </div>
        <div className="mt-5">
          <IInput
            name="confirmPassword"
            label="Confirm Password"
            placeholder="************"
            value={confirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
          />
        </div>
        <div className="mt-8">
          <button
            className="rounded-2xl font-light text-white text-md bg-regal-blue py-3 px-4"
            onClick={handlePasswordChange}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Security;
