import React from "react";
import IListBox from "../../../Library/ListBox/IListBox";
import IInput from "../../../Library/Input/IInput";

interface GeneralInformationFormProps {
  onNextStep: () => void;
}

function GeneralInformationForm({ onNextStep }: GeneralInformationFormProps) {
  const handleContinue = (): void => {
    onNextStep();
  };

  const dayOptions: number[] = Array.from(
    { length: 31 },
    (_, index) => index + 1,
  );

  const monthOptions: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 100; // You can adjust this to set the lower limit

  const yearOptions = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => startYear + index,
  );

  const genderOptions: string[] = ["Male", "Female", "Other"];

  return (
    <div>
      <div className="grid-rows-2">
        <div className="h-screen flex items-center justify-center">
          <div className="grid grid-rows" style={{ width: "350px" }}>
            <div className="mb-3 text-2xl font-medium">General information</div>
            <div>
              <IInput name="firstName" placeholder="Alex" label="First Name" />
            </div>
            <div className="mt-4">
              <IInput name="lastName" placeholder="Costa" label="Last Name" />
            </div>

            <div className="mt-4">Birth date</div>
            <div className="mt-1 relative">
              <div className="flex">
                <div className="w-3/12 mr-2 ">
                  <IListBox options={dayOptions} placeHolder="Day" />
                </div>
                <div className="w-full mr-2">
                  <IListBox options={monthOptions} placeHolder="Month" />
                </div>
                <div className="w-full">
                  <IListBox options={yearOptions} placeHolder="Year" />
                </div>
              </div>
            </div>
            <div>
              <div className="mt-4">Gender</div>
              <div className="w-4/12">
                <IListBox options={genderOptions} placeHolder="Select" />
              </div>
            </div>

            <div>
              <button
                className="w-full rounded-2xl font-light text-white text-md bg-regal-blue py-2 px-8 border border-grey mt-6"
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralInformationForm;
