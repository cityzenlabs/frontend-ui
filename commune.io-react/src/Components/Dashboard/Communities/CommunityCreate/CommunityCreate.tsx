import React, { useState } from "react";
import ILabel from "../../../../Library/Label/ILabel";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import { useAuth } from "../../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import IStepper from "../../../../Library/Stepper/IStepper";
import IPanel from "../../../../Library/Panel/IPanel";
import DetailForm from "../Reusable/DetailForm";
import { Button } from "@mui/material";
import RequirementForm from "../Reusable/RequirementForm";
import PhotoForm from "../Reusable/PhotoForm";

function CommunityCreate() {
  let navigate = useNavigate();
  const accessToken = useAuth();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [minAge, setMinAge] = useState<string>("");
  const [maxAge, setMaxAge] = useState<string>("");
  const [genderRequirements, setGenderRequirements] = useState("");
  const [description, setDescription] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const steps = ["Details", "Requirements", "Photos"];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImageFiles = e.target.files;
    if (selectedImageFiles && selectedImageFiles[0]) {
      setImageFiles([selectedImageFiles[0]]);
    }
  };

  const initialOptions = [
    { label: "Social", value: "SOCIAL" },
    { label: "Adventure", value: "ADVENTURE" },
    { label: "Fitness", value: "FITNESS" },
    { label: "Intelligence", value: "INTELLIGENCE" },
    { label: "Culture", value: "CULTURE" },
    { label: "Night Lift", value: "NIGHTLIFE" },
  ];

  const [dropdowns, setDropdowns] = useState([
    { attribute: undefined, level: undefined },
  ]);
  const [attributeRequirements, setAttributeRequirements] = useState<any>({});

  const handleAttributeChange = (index: any, selectedValue: any) => {
    const newDropdowns = [...dropdowns];
    newDropdowns[index].attribute = selectedValue;
    setDropdowns(newDropdowns);
  };

  const handleLevelChange = (index: any, selectedValue: any) => {
    const newDropdowns = [...dropdowns];
    newDropdowns[index].level = selectedValue;

    const newAttributeRequirements = { ...attributeRequirements };
    const attribute = newDropdowns[index].attribute;

    if (attribute) {
      newAttributeRequirements[attribute] = parseInt(selectedValue, 10) || 0;
    }

    setAttributeRequirements(newAttributeRequirements);
    setDropdowns(newDropdowns);
  };

  const addDropdown = () => {
    const lastIndex = dropdowns.length - 1;
    const selectedAttribute = dropdowns[lastIndex].attribute;
    const selectedLevel = dropdowns[lastIndex].level;

    if (selectedAttribute && selectedLevel) {
      const newDropdowns = [...dropdowns];
      newDropdowns.push({ attribute: undefined, level: undefined });
      setDropdowns(newDropdowns);
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
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
      attributeRequirements: attributeRequirements,
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
        <ILabel text="Create Community"></ILabel>
      </div>
      <IPanel>
        <IStepper steps={steps} activeStep={activeStep} />
        <div className="xl:pl-[14.5%] xl:pr-[14.5%] mt-10">
          {activeStep === 1 && (
            <DetailForm
              name={name}
              setName={setName}
              city={city}
              setCity={setCity}
              state={state}
              setState={setState}
              description={description}
              setDescription={setDescription}
            />
          )}
          {activeStep === 2 && (
            <RequirementForm
              minAge={minAge}
              setMinAge={setMinAge}
              maxAge={maxAge}
              setMaxAge={setMaxAge}
              genderRequirements={genderRequirements}
              setGenderRequirements={setGenderRequirements}
              dropdowns={dropdowns}
              availableOptions={initialOptions}
              attributeRequirements={attributeRequirements}
              onAttributeChange={handleAttributeChange}
              onLevelChange={handleLevelChange}
              onAddDropdown={addDropdown}
            />
          )}

          {activeStep === 3 && (
            <PhotoForm
              imageFiles={imageFiles}
              handleImageChange={handleImageChange}
            />
          )}
        </div>
        <div className="flex justify-center mt-4">
          <Button
            color="inherit"
            disabled={activeStep === 1}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button onClick={handleNext}>
            {activeStep === steps.length ? (
              <span onClick={handleCreateCommunity}>Create</span>
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </IPanel>
    </div>
  );
}

export default CommunityCreate;
