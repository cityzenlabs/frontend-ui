import React, { ChangeEvent } from "react";
import IInput from "../../../Library/Input/IInput";
import IInputGroup from "../../../Library/InputGroup/IInputGroup";
import ITextArea from "../../../Library/TextArea/ITextArea";

function DetailForm({
  name,
  setName,
  city,
  setCity,
  state,
  setState,
  description,
  setDescription,
  community,
}: any) {
  return (
    <div>
      <div className="pb-4">
        <IInput
          label="Community Name"
          placeholder={community ? community?.name : "Name"}
          name="name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        ></IInput>
      </div>
      <div className="pb-4">
        <IInputGroup
          label="Location"
          inputs={[
            {
              name: "city",
              placeholder: community ? community?.city : "City",

              value: city,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setCity(e.target.value),
            },
            {
              name: "state",
              placeholder: community ? community?.state : "State",

              value: state,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setState(e.target.value),
            },
          ]}
        ></IInputGroup>
      </div>
      <div className="pb-4">
        <ITextArea
          name="description"
          placeholder={community ? community?.description : "Description..."}
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
        />
      </div>
    </div>
  );
}

export default DetailForm;
