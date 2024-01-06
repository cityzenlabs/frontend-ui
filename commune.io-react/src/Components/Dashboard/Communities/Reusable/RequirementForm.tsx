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
  user,
}: any) {
  const getLevelOptions = (selectedAttribute: any) => {
    let levelOptions = [];
    const userLevel = user?.attributes[selectedAttribute]?.level;

    for (let i = 0; i <= userLevel; i++) {
      levelOptions.push({ label: String(i), value: i });
    }

    return levelOptions;
  };

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
        <div className="w-1/2 pb-4">
          <IDropdown
            onChange={setGenderRequirements}
            labelText="Gender"
            options={[
              { label: "Male", value: "MALE" },
              { label: "Female", value: "FEMALE" },
              { label: "Neutral", value: "NEUTRAL" },
            ]}
            value={genderRequirements}
          />
        </div>
      </div>
      <div className="pb-4">
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
        />
      </div>

      <div className="pb-4">
        {dropdowns.map((dropdown: any, index: any) => {
          const usedAttributes = dropdowns
            .filter((_: any, i: any) => i < index)
            .map((item: any) => item.attribute);

          const levelOptions = dropdown.attribute
            ? getLevelOptions(dropdown.attribute)
            : [{ label: "Select Attribute First", value: "" }];

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
                  options={levelOptions}
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
