import React, { ChangeEvent } from "react";
import IInput from "../../../../Library/Input/IInput";
import IDropdown from "../../../../Library/Dropdown/IDropdown";
import ITextArea from "../../../../Library/TextArea/ITextArea";
import { CategoryKey } from "../EventCreate/EventCreateMapping";

function EventDetailForm({
  name,
  setName,
  joinedCommunities,
  community,
  setCommunity,
  description,
  setDescription,
  type,
  setType,
  categoryOptions,
  category,
  handleCategoryChange,
}: any) {
  return (
    <div>
      <div className="pb-4">
        <IInput
          label="Event Name"
          placeholder=""
          name="name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        ></IInput>
      </div>

      <div className="pb-4">
        <IDropdown
          labelText="Community"
          options={joinedCommunities}
          onChange={(newValue) => setCommunity(newValue)}
          value={community}
        ></IDropdown>
      </div>
      <div className="pb-4">
        <IDropdown
          labelText="Type"
          options={[
            { value: "SOCIAL", label: "Social" },
            { value: "HOSTED", label: "Hosted" },
          ]}
          value={type}
          onChange={setType}
        />
      </div>
      <div className="pb-4">
        <IDropdown
          labelText="Category"
          options={categoryOptions}
          onChange={(newValue) => handleCategoryChange(newValue as CategoryKey)}
          value={category}
        ></IDropdown>
      </div>
      <div className="pb-4">
        <ITextArea
          name="description"
          placeholder="Enter description here..."
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
        />
      </div>
    </div>
  );
}

export default EventDetailForm;
