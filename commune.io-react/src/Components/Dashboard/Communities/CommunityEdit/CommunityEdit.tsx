import React, { ChangeEvent, useEffect, useState } from "react";
import IContainer from "../../../../Library/Container/IContainer";
import ILabel from "../../../../Library/Label/ILabel";
import IInput from "../../../../Library/Input/IInput";
import IInputGroup from "../../../../Library/InputGroup/IInputGroup";
import ITextArea from "../../../../Library/TextArea/ITextArea";
import IGallery from "../../../../Library/Gallery/IGallery";
import IButton from "../../../../Library/Button/IButton";
import * as CommunityService from "../../../../Services/CommunityService/CommunityService";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../../Context/AuthContext";
import ITab from "../../../../Library/Tab/ITab";
import IPanel from "../../../../Library/Panel/IPanel";
import PhotoForm from "../Reusable/PhotoForm";
import DetailForm from "../Reusable/DetailForm";

function CommunityDashboardEdit() {
  const accessToken = useAuth();
  const location = useLocation();
  const [community, setCommunity] = useState<any>();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [description, setDescription] = useState("");
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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
    setDescription("");
    setImageFiles([]);
  };

  useEffect(() => {
    if (location.state?.community) {
      setCommunity(location.state.community);
    }
  }, [accessToken.token]);

  const handleEditCommunity = async () => {
    const fieldsToCheck: any = [
      { stateKey: "name", original: community?.name },
      { stateKey: "city", original: community?.city },
      { stateKey: "state", original: community?.state },
      { stateKey: "description", original: community?.description },
    ];

    const updatedFields = fieldsToCheck.reduce((acc: any, field: any) => {
      const stateValues: any = {
        name,
        city,
        state,
        description,
      };
      acc[field.stateKey] = stateValues[field.stateKey];
      return acc;
    }, {});

    try {
      const result = await CommunityService.editCommunity(
        accessToken.token,
        community?.id,
        updatedFields,
      );
      if (result) {
        setCommunity(result);
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
      <div className="pt-4 pb-4">
        <ILabel text="Edit Community" />
      </div>
      <IPanel>
        <ITab
          tabValue={tabValue}
          handleTabChange={handleTabChange}
          tabs={["Details", "Photos"]}
        />
        <div className="xl:pl-[14.5%] xl:pr-[14.5%] mt-10">
          {tabValue === 1 && (
            <PhotoForm
              imageFiles={imageFiles}
              handleImageChange={handleImageChange}
              picture={community?.photo}
            />
          )}
          {tabValue === 0 && (
            <DetailForm
              community={community}
              name={name}
              setName={setName}
              city={city}
              setCity={setCity}
              state={state}
              setState={setState}
              description={description}
              setDescription={setDescription}
              disabled={true}
            />
          )}
          <div className="pb-4 ">
            <IButton
              onClick={handleEditCommunity}
              className="px-4 py-2 "
              text="Save"
              bgColor="bg-regal-blue"
              textColor="text-white"
            />
          </div>
        </div>
      </IPanel>
    </div>
  );
}

export default CommunityDashboardEdit;
