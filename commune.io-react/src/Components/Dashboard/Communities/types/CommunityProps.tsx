import { Visibility } from "../Enums/CommunityEnums";

export interface CommunitiesProps {
  setCommunitiesVisibility: (visible: Visibility) => void;
  setCommunityId?: (visible: Visibility) => void;
}
