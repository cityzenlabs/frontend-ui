import React, { useState } from "react";
import { CommunitiesProps } from "../types/CommunityProps";
import { Visibility } from "../Enums/CommunityEnums";
import { locationData } from "./CreateCommunitiesConstants.tsx/Constants";
import { attributes } from "./CreateCommunitiesConstants.tsx/Constants";
import IContainer from "../../../../Library/Container/IContainer";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import ILabel from "../../../../Library/Label/ILabel";
import IInput from "../../../../Library/Input/IInput";
import IToggleButtonGroup from "../../../../Library/ToggleButtonGroup/IToggleButtonGroup";
import IInputGroup from "../../../../Library/InputGroup/IInputGroup";
import ITextArea from "../../../../Library/TextArea/ITextArea";
import IGallery from "../../../../Library/Gallery/IGallery";

function CreateCommunities({ setCommunitiesVisibility }: CommunitiesProps) {
  const [imageFiles, setImageFiles] = useState<File[]>([]); // Initialize imageFiles state as an empty array
  const [genderRequirements, setGenderRequirements] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImageFiles = e.target.files;
    if (selectedImageFiles) {
      setImageFiles([...imageFiles, ...Array.from(selectedImageFiles)]);
    }
  };

  const handleBack = () => {
    setCommunitiesVisibility(Visibility.Communities);
  };

  return (
    <div>
      <IContainer paddingY={8}>
        <div className="flex">
          <IBackButton onClick={handleBack} />
          <ILabel text="Create Communities" className="ml-4"></ILabel>
        </div>
      </IContainer>
      <IContainer>
        <div className="xl:w-1/4 lg:w-1/2">
          <IInput
            label="Name"
            placeholder="Community Name"
            name="name"
          ></IInput>
        </div>
      </IContainer>
      <IContainer paddingY={4}>
        <div className="xl:w-1/4 lg:w-1/2">
          <IInputGroup
            label="Location"
            inputs={[
              {
                name: "city",
                placeholder: "City", // Replace with your own method
              },
              {
                name: "state",
                placeholder: "State", // Replace with your own method
              },
            ]}
          ></IInputGroup>
        </div>
      </IContainer>

      <IContainer>
        <div className="xl:w-1/4 lg:w-1/2">
          <IInputGroup
            label="Age"
            inputs={[
              {
                name: "min",
                placeholder: "Min",
              },
              {
                name: "max",
                placeholder: "Max",
              },
            ]}
          ></IInputGroup>
        </div>
      </IContainer>
      <IContainer paddingY={4}>
        <IToggleButtonGroup
          label="Gender Requirements"
          options={[
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
            { value: "Both", label: "Both" },
          ]}
          selectedValue={genderRequirements}
          onChange={setGenderRequirements}
        />
      </IContainer>

      <IContainer>
        <div className="xl:w-1/4 lg:w-1/2 flex">
          <IInput
            label="Dues"
            name="dues"
            placeholder="Membership Dues"
          ></IInput>
        </div>
      </IContainer>

      <IContainer paddingY={4}>
        <div className="xl:w-2/3 lg:w-full">
          <IInputGroup
            label="Attributes"
            floatingLabel={true}
            inputs={[
              {
                name: "Social",
                placeholder: "Social",
                displayLabel: "Social",
              },
              {
                name: "Intelligence",
                placeholder: "Intelligence",
                displayLabel: "Intelligence",
              },
              {
                name: "Professional",
                placeholder: "Professional",
                displayLabel: "Professional",
              },
              {
                name: "Wellness",
                placeholder: "Wellness",
                displayLabel: "Wellness",
              },
              {
                name: "Adventure",
                placeholder: "Adventure",
                displayLabel: "Adventure",
              },
              {
                name: "Culture",
                placeholder: "Culture",
                displayLabel: "Culture",
              },
              {
                name: "Other",
                placeholder: "Other",
                displayLabel: "Other",
              },
            ]}
          ></IInputGroup>
        </div>
      </IContainer>

      <IContainer>
        <ITextArea name="description" placeholder="Enter description here..." />
      </IContainer>

      <IContainer paddingY={4}>
        <IGallery imageFiles={imageFiles} onImageChange={handleImageChange} />
      </IContainer>
    </div>
  );
}

export default CreateCommunities;
