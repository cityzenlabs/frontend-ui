import React, { ChangeEvent, useState } from "react";
import { CommunitiesProps } from "../types/CommunityProps";
import { Visibility } from "../Enums/CommunityEnums";
import IContainer from "../../../../Library/Container/IContainer";
import IBackButton from "../../../../Library/BackButton/IBackButton";
import ILabel from "../../../../Library/Label/ILabel";
import IInput from "../../../../Library/Input/IInput";
import IToggleButtonGroup from "../../../../Library/ToggleButtonGroup/IToggleButtonGroup";
import IInputGroup from "../../../../Library/InputGroup/IInputGroup";
import ITextArea from "../../../../Library/TextArea/ITextArea";
import IGallery from "../../../../Library/Gallery/IGallery";
import IButton from "../../../../Library/Button/IButton";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";

function CreateCommunities({ setCommunitiesVisibility }: CommunitiesProps) {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [minAge, setMinAge] = useState<string>("");
  const [maxAge, setMaxAge] = useState<string>("");
  const [genderRequirements, setGenderRequirements] = useState("");
  const [dues, setDues] = useState("");
  const [social, setSocial] = useState("");
  const [intelligence, setIntelligence] = useState("");
  const [nightLife, setNightLife] = useState("");
  const [adventure, setAdventure] = useState("");
  const [culture, setCulture] = useState("");
  const [fitness, setFitness] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImageFiles = e.target.files;
    if (selectedImageFiles) {
      setImageFiles([...imageFiles, ...Array.from(selectedImageFiles)]);
    }
  };

  const handleBack = () => {
    setCommunitiesVisibility(Visibility.Communities);
  };

  const resetFields = () => {
    setName("");
    setCity("");
    setState("");
    setMinAge("");
    setMaxAge("");
    setGenderRequirements("");
    setDues("");
    setSocial("");
    setIntelligence("");
    setNightLife("");
    setAdventure("");
    setCulture("");
    setFitness("");
    setDescription("");
  };

  const handleCreateCommunity = async () => {
    const community = {
      name: name,
      picture: "",
      description: description,
      city: city,
      state: state,
      membershipDues: parseInt(dues),
      minimumAge: parseInt(minAge),
      maximumAge: parseInt(maxAge),
      genderRequirements: genderRequirements,
      attributeRequirements: {
        SOCIAL: parseInt(social, 10) || 0,
        INTELLIGENCE: parseInt(intelligence, 10) || 0,
        ADVENTURE: parseInt(adventure, 10) || 0,
        CULTURE: parseInt(culture, 10) || 0,
        NIGHTLIFE: parseInt(nightLife, 10) || 0,
        FITNESS: parseInt(fitness, 10) || 0,
      },
    };

    try {
      const result = await CommunityService.createCommunity(community);
      if (result.id) {
        resetFields();
      }
      console.log(result.error);
    } catch (error) {
      console.error(error);
    }
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
        <div className="xl:w-1/2 lg:w-1/2">
          <IInput
            label="Name"
            placeholder="Community Name"
            name="name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          ></IInput>
        </div>
      </IContainer>
      <IContainer paddingY={4}>
        <div className="xl:w-1/2 lg:w-1/2">
          <IInputGroup
            label="Location"
            inputs={[
              {
                name: "city",
                placeholder: "City",
                value: city,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setCity(e.target.value),
              },
              {
                name: "state",
                placeholder: "State",
                value: state,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setState(e.target.value),
              },
            ]}
          ></IInputGroup>
        </div>
      </IContainer>

      <IContainer>
        <div className="xl:w-1/2 lg:w-1/2">
          <IInputGroup
            label="Age"
            inputs={[
              {
                name: "min",
                placeholder: "Min",
                value: minAge,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setMinAge(e.target.value),
                numberOnly: true,
              },
              {
                name: "max",
                placeholder: "Max",
                value: maxAge,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setMaxAge(e.target.value),
                numberOnly: true,
              },
            ]}
          ></IInputGroup>
        </div>
      </IContainer>
      <IContainer paddingY={4}>
        <IToggleButtonGroup
          label="Gender Requirements"
          options={[
            { value: "MALE", label: "Male" },
            { value: "FEMALE", label: "Female" },
            { value: "BOTH", label: "Both" },
          ]}
          selectedValue={genderRequirements}
          onChange={setGenderRequirements}
        />
      </IContainer>

      <IContainer>
        <div className="xl:w-1/2 lg:w-1/2">
          <IInput
            label="Dues"
            name="dues"
            placeholder="Membership Dues"
            value={dues}
            numberOnly={true}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDues(e.target.value)
            }
          ></IInput>
        </div>
      </IContainer>

      <IContainer paddingY={4}>
        <div className="xl:w-1/2 lg:w-full">
          <IInputGroup
            label="Attributes"
            floatingLabel={true}
            inputs={[
              {
                name: "Social",
                placeholder: "Social",
                displayLabel: "Social",
                value: social,
                numberOnly: true,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setSocial(e.target.value),
              },
              {
                name: "Intelligence",
                placeholder: "Intelligence",
                displayLabel: "Intelligence",
                numberOnly: true,
                value: intelligence,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setIntelligence(e.target.value),
              },
              {
                name: "Night Life",
                placeholder: "Night Life",
                displayLabel: "Night Life",
                numberOnly: true,
                value: nightLife,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setNightLife(e.target.value),
              },
            ]}
          ></IInputGroup>
        </div>
      </IContainer>
      <IContainer>
        <div className="xl:w-1/2">
          <IInputGroup
            label=""
            floatingLabel={true}
            inputs={[
              {
                name: "Adventure",
                placeholder: "Adventure",
                displayLabel: "Adventure",
                numberOnly: true,
                value: adventure,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setAdventure(e.target.value),
              },
              {
                name: "Culture",
                placeholder: "Culture",
                displayLabel: "Culture",
                numberOnly: true,
                value: culture,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setCulture(e.target.value),
              },

              {
                name: "Fitness",
                placeholder: "Fitness",
                displayLabel: "Fitness",
                numberOnly: true,
                value: fitness,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setFitness(e.target.value),
              },
            ]}
          ></IInputGroup>
        </div>
      </IContainer>

      <IContainer paddingY={4}>
        <div className="xl:w-1/2">
          <ITextArea
            name="description"
            placeholder="Enter description here..."
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
          />
        </div>
      </IContainer>

      <IContainer>
        <IGallery imageFiles={imageFiles} onImageChange={handleImageChange} />
      </IContainer>

      <IContainer paddingY={8}>
        <IButton
          onClick={handleCreateCommunity}
          text="Publish"
          bgColor="bg-regal-blue"
          textColor="text-white"
        />
      </IContainer>
    </div>
  );
}

export default CreateCommunities;
