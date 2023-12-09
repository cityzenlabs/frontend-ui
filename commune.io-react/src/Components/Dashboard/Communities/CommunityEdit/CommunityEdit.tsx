import React, { ChangeEvent, useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import ILabel from "../../../../Library/Label/ILabel";
import IInput from "../../../../Library/Input/IInput";
import IInputGroup from "../../../../Library/InputGroup/IInputGroup";
import ITextArea from "../../../../Library/TextArea/ITextArea";
import IGallery from "../../../../Library/Gallery/IGallery";
import IButton from "../../../../Library/Button/IButton";
import IDropdown from "../../../../Library/Dropdown/IDropdown";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../AuthContext";

function CommunityDashboardEdit() {
  const { communityId } = useParams();
  const accessToken = useAuth();

  const [community, setCommunity] = useState<any>();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [minimumAge, setMinAge] = useState<string>("");
  const [maximumAge, setMaxAge] = useState<string>("");
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

  const resetFields = () => {
    setName("");
    setCity("");
    setState("");
    setMinAge("");
    setMaxAge("");
    setGenderRequirements("");
    setSocial("");
    setIntelligence("");
    setNightLife("");
    setAdventure("");
    setCulture("");
    setFitness("");
    setDescription("");
    setImageFiles([]);
  };
  const fetchCommunityData = async (callback = () => {}) => {
    try {
      const community = await CommunityService.getCommunity(
        communityId,
        accessToken.token,
      );
      if (community) {
        setCommunity(community);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchCommunityData()]);
    };

    fetchData();
  }, [communityId, accessToken.token]);

  const handleEditCommunity = async () => {
    const fieldsToCheck: any = [
      { stateKey: "name", original: community?.name },
      { stateKey: "city", original: community?.city },
      { stateKey: "state", original: community?.state },
      { stateKey: "minimumAge", original: community?.minimumAge },
      { stateKey: "maximumAge", original: community?.maximumAge },
      {
        stateKey: "genderRequirements",
        original: community?.genderRequirements,
      },
      { stateKey: "social", original: community?.attributeRequirements.SOCIAL },
      {
        stateKey: "intelligence",
        original: community?.attributeRequirements.INTELLIGENCE,
      },
      {
        stateKey: "nightLife",
        original: community?.attributeRequirements.NIGHTLIFE,
      },
      {
        stateKey: "adventure",
        original: community?.attributeRequirements.ADVENTURE,
      },
      {
        stateKey: "culture",
        original: community?.attributeRequirements.CULTURE,
      },
      {
        stateKey: "fitness",
        original: community?.attributeRequirements.FITNESS,
      },
      { stateKey: "description", original: community?.description },
    ];

    const updatedFields = fieldsToCheck.reduce((acc: any, field: any) => {
      const stateValues: any = {
        name,
        city,
        state,
        minimumAge,
        maximumAge,
        genderRequirements,
        social,
        intelligence,
        nightLife,
        adventure,
        culture,
        fitness,
        description,
      };
      const currentValue = stateValues[field.stateKey];

      // Always include the attribute requirements with their original or updated values
      if (
        [
          "social",
          "intelligence",
          "nightLife",
          "adventure",
          "culture",
          "fitness",
        ].includes(field.stateKey)
      ) {
        if (!acc.attributeRequirements) {
          acc.attributeRequirements = {};
        }
        acc.attributeRequirements[field.stateKey.toUpperCase()] =
          currentValue !== "" ? Number(currentValue) : field.original;
      } else {
        // For other fields, update only if there is a change
        if (currentValue !== "" && currentValue !== field.original) {
          acc[field.stateKey] = currentValue;
        }
      }
      return acc;
    }, {});

    try {
      const result = await CommunityService.editCommunity(
        accessToken.token,
        community?.id,
        updatedFields,
      );
      if (result) {
        fetchCommunityData();
        resetFields();
        if (imageFiles.length > 0) {
          await CommunityService.updateCommunityPicture(
            accessToken.token,
            community?.id,
            imageFiles[0],
          );
        }
      }
    } catch (error) {}
  };

  return (
    <div>
      <IContainer className="pb-4 pt-4">
        <div className="xl:flex lg:flex items-center justify-between">
          <div className="flex items-center">
            <ILabel text="Edit Community" />
          </div>
        </div>
      </IContainer>

      <IContainer className="pb-4">
        <div className="xl:w-1/2 lg:w-1/2">
          <IInput
            label="Name"
            placeholder={community?.name}
            name="name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          ></IInput>
        </div>
      </IContainer>
      <IContainer className="pb-4">
        <div className="xl:w-1/2 lg:w-1/2">
          <IInputGroup
            label="Location"
            inputs={[
              {
                name: "city",
                placeholder: community?.city,
                value: city,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setCity(e.target.value),
                disabled: true,
              },
              {
                name: "state",
                placeholder: community?.state,
                value: state,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setState(e.target.value),
                disabled: true,
              },
            ]}
          ></IInputGroup>
        </div>
      </IContainer>

      <IContainer className="pb-4">
        <div className="xl:w-1/2 lg:w-1/2">
          <IInputGroup
            label="Age"
            inputs={[
              {
                name: "min",
                placeholder: community?.minimumAge,
                value: minimumAge,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setMinAge(e.target.value),
                numberOnly: true,
              },
              {
                name: "max",
                placeholder: community?.maximumAge,
                value: maximumAge,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setMaxAge(e.target.value),
                numberOnly: true,
              },
            ]}
          ></IInputGroup>
        </div>
      </IContainer>

      <IContainer className="pb-4">
        <div className="xl:w-1/2 lg:w-full">
          <IInputGroup
            label="Attributes"
            floatingLabel={true}
            inputs={[
              {
                name: "Social",
                placeholder: "Social",
                displayLabel: `Social- ${community?.attributeRequirements.SOCIAL}`,
                value: social,
                numberOnly: true,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setSocial(e.target.value),
              },
              {
                name: "Intelligence",
                placeholder: "",
                displayLabel: `Intelligence - ${community?.attributeRequirements.INTELLIGENCE}`,
                numberOnly: true,
                value: intelligence,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setIntelligence(e.target.value),
              },
              {
                name: "Night Life",
                placeholder: "Night Life",
                displayLabel: `Night Life - ${community?.attributeRequirements.NIGHTLIFE}`,
                numberOnly: true,
                value: nightLife,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setNightLife(e.target.value),
              },
            ]}
          ></IInputGroup>
        </div>
      </IContainer>
      <IContainer className="pb-4">
        <div className="xl:w-1/2">
          <IInputGroup
            label=""
            floatingLabel={true}
            inputs={[
              {
                name: "Adventure",
                placeholder: "Adventure",
                displayLabel: `Adventure - ${community?.attributeRequirements.ADVENTURE}`,
                numberOnly: true,
                value: adventure,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setAdventure(e.target.value),
              },
              {
                name: "Culture",
                placeholder: "Culture",
                displayLabel: `Culture - ${community?.attributeRequirements.CULTURE}`,
                numberOnly: true,
                value: culture,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setCulture(e.target.value),
              },

              {
                name: "Fitness",
                placeholder: "Fitness",
                displayLabel: `Fitness - ${community?.attributeRequirements.FITNESS}`,
                numberOnly: true,
                value: fitness,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setFitness(e.target.value),
              },
            ]}
          ></IInputGroup>
        </div>
      </IContainer>
      <IContainer className="pb-4">
        <div className="flex xl:w-1/2 lg:w-1/2">
          <div className="mr-2 w-full">
            <IDropdown
              labelText="Gender Requirements"
              placeholder={
                community?.genderRequirements.toUpperCase()[0] +
                community?.genderRequirements.toLowerCase().slice(1)
              }
              options={[
                { label: "Male", value: "MALE" },
                { label: "Female", value: "FEMALE" },
                { label: "Neutral", value: "NEUTRAL" },
              ]}
              onChange={(newValue) => setGenderRequirements(newValue)}
              value={genderRequirements}
            ></IDropdown>
          </div>
        </div>
      </IContainer>

      <IContainer className="pb-4">
        <div className="xl:w-1/2">
          <ITextArea
            name="description"
            placeholder={community?.description}
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
          />
        </div>
      </IContainer>

      <IContainer className="pb-4">
        <IGallery imageFiles={imageFiles} onImageChange={handleImageChange} />
      </IContainer>

      <IContainer className="pb-4">
        <IButton
          onClick={handleEditCommunity}
          className="px-4 py-2"
          text="Save"
          bgColor="bg-regal-blue"
          textColor="text-white"
        />
      </IContainer>
    </div>
  );
}

export default CommunityDashboardEdit;
