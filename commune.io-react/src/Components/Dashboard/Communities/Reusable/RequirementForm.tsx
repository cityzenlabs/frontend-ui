import React from "react";
import IInputGroup from "../../../../Library/InputGroup/IInputGroup";
import IDropdown from "../../../../Library/Dropdown/IDropdown";
import { PlusIcon } from "@heroicons/react/outline";

function RequirementForm({
  minAge,
  setMinAge,
  maxAge,
  setMaxAge,
  genderRequirements,
  setGenderRequirements,
  dropdowns,
  availableOptions,
  onAttributeChange,
  onLevelChange,
  onAddDropdown,
  privacy,
  setPrivacy,
}: any) {
  return (
    <div>
      <div className="flex gap-2">
        <div className="w-1/2 pb-4">
          <IDropdown
            options={[
              { label: "Private", value: true },
              { label: "Public", value: false },
            ]}
            labelText="Privacy"
            value={privacy}
            onChange={setPrivacy}
          />
        </div>
        <div className=" w-1/2 pb-4">
          <IDropdown
            onChange={setGenderRequirements}
            labelText="Gender"
            options={[
              { label: "Male", value: "MALE" },
              { label: "Female", value: "FEMALE" },
              { label: "Neutral", value: "NEUTRAL" },
            ]}
            value={genderRequirements}
          ></IDropdown>
        </div>
      </div>
      <div className="pb-4">
        {" "}
        <IInputGroup
          label="Age"
          inputs={[
            {
              name: "min",
              placeholder: "Min age",
              value: minAge,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setMinAge(e.target.value),
              numberOnly: true,
            },
            {
              name: "Max Age",
              placeholder: "Max age",
              value: maxAge,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setMaxAge(e.target.value),
              numberOnly: true,
            },
          ]}
        ></IInputGroup>
      </div>

      <div className="pb-4">
        {dropdowns.map((dropdown: any, index: any) => {
          const usedAttributes = dropdowns
            .filter((_: any, i: any) => i < index) // Get attributes from previous dropdowns
            .map((item: any) => item.attribute);

          return (
            <div key={index} className="pb-4 flex justify-between gap-2">
              <div className="w-1/2">
                <IDropdown
                  options={availableOptions.filter(
                    (option: any) => !usedAttributes.includes(option.value),
                  )}
                  labelText="Attribute"
                  value={dropdown.attribute || ""}
                  onChange={(value) => onAttributeChange(index, value)}
                />
              </div>
              <div className="w-1/2">
                <IDropdown
                  options={[
                    { label: "0", value: 0 },
                    { label: "1", value: 1 },
                    { label: "2", value: 2 },
                    { label: "3", value: 3 },
                    { label: "4", value: 4 },
                    { label: "5", value: 5 },
                    { label: "6", value: 6 },
                    { label: "7", value: 7 },
                    { label: "8", value: 8 },
                    { label: "9", value: 9 },
                    { label: "10", value: 10 },
                  ]}
                  labelText="Level"
                  value={dropdown.level || ""}
                  onChange={(value) => onLevelChange(index, value)}
                />
              </div>
            </div>
          );
        })}
        <PlusIcon className="h-6 w-6 border rounded" onClick={onAddDropdown} />
      </div>
    </div>
  );
}

export default RequirementForm;
