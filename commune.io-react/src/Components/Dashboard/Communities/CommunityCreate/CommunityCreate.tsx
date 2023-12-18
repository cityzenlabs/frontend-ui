import React, { ChangeEvent, useState } from "react";
import ILabel from "../../../../Library/Label/ILabel";
import IInput from "../../../../Library/Input/IInput";
import IInputGroup from "../../../../Library/InputGroup/IInputGroup";
import ITextArea from "../../../../Library/TextArea/ITextArea";
import IGallery from "../../../../Library/Gallery/IGallery";
import IButton from "../../../../Library/Button/IButton";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import { useAuth } from "../../../../Context/AuthContext";
import IDropdown from "../../../../Library/Dropdown/IDropdown";

import { useDash } from "../../../../Context/DashboardContext";
import { useNavigate } from "react-router-dom";

function CommunityCreate() {
  let navigate = useNavigate();
  const accessToken = useAuth();
  const { triggerDataRefresh } = useDash();

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [minAge, setMinAge] = useState<string>("");
  const [maxAge, setMaxAge] = useState<string>("");
  const [genderRequirements, setGenderRequirements] = useState("");
  const [social, setSocial] = useState("");
  const [intelligence, setIntelligence] = useState("");
  const [nightLife, setNightLife] = useState("");
  const [adventure, setAdventure] = useState("");
  const [culture, setCulture] = useState("");
  const [fitness, setFitness] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImageFiles = e.target.files;
    if (selectedImageFiles && selectedImageFiles[0]) {
      setImageFiles([selectedImageFiles[0]]);
    }
  };

  const handleCreateCommunity = async () => {
    const community = {
      name: name,
      description: description,
      city: city,
      state: state,
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
      const result = await CommunityService.createCommunity(
        community,
        accessToken.token,
      );
      navigate(`/community/manage/${result.id}`);

      if (imageFiles.length > 0) {
        await CommunityService.updateCommunityPicture(
          accessToken.token,
          result?.id,
          imageFiles[0],
        );
      }
    } catch (error) {}
  };

  return (
    <div>
      <div className="pt-4 pb-4">
        <ILabel text="Create Communities"></ILabel>
      </div>
      <div className="xl:w-1/2 lg:w-1/2 pb-4">
        <IInput
          label="Community Name"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        ></IInput>
      </div>
      <div className="xl:w-1/2 lg:w-1/2 pb-4">
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

      <div className="xl:w-1/2 lg:w-1/2 pb-4">
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

      <div className="xl:w-1/2 lg:w-full pb-4">
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
      <div className="xl:w-1/2 pb-4">
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

      <div className="flex xl:w-1/2 lg:w-full pb-4">
        <div className="mr-2 w-full">
          <IDropdown
            onChange={setGenderRequirements}
            labelText="Gender Requirements"
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
        <div className="xl:w-1/2">
          <ITextArea
            name="description"
            placeholder=""
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
          />
        </div>
      </div>

      <div className="pb-4">
        <IGallery imageFiles={imageFiles} onImageChange={handleImageChange} />
      </div>

      <div className="pb-4">
        <IButton
          onClick={handleCreateCommunity}
          className="px-4 py-2"
          text="Create"
          bgColor="bg-regal-blue"
          textColor="text-white"
        />
      </div>
    </div>
  );
}

export default CommunityCreate;
