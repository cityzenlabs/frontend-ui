import React from "react";
import IPanel from "../../../../Library/Panel/IPanel";
import { tableStyle, thStyle, tdStyle, imgStyle } from "./LeaderBoardStyles";
import { useNavigate } from "react-router-dom";

// TypeScript interface for a community
interface Community {
  id: string;
  name: string;
  photo: string;
  organizerName: string;
  members: number;
  points: number;
  attribute: string;
}

// Props interface for ICommunityLeaderBoard component
interface CommunityLeaderBoardProps {
  communities: Community[];
  onRowClick: (communityName: any, communityId: any) => void;
  page: number;
  firstThree: Community[];
}

// TableRow component for table rows
const TableRow = ({
  community,
  index,
  onRowClick,
  page,
}: {
  community: Community;
  index: number;
  onRowClick: (communityName: any, communityId: any) => void;
  page: number;
}) => {
  return (
    <tr
      key={community.id}
      style={{ border: "1px solid #DADEE5" }}
      onClick={() => onRowClick(community?.name, community?.id)}
    >
      <td style={tdStyle}>{4 + (page - 1) * 7 + index}.</td>
      <td style={tdStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={community?.photo}
            alt={`${community.name}`}
            style={imgStyle}
          />
          <span className="text-xs">{community.name}</span>
        </div>
      </td>

      <td style={tdStyle} className="text-xs">
        {community.attribute}
      </td>
      <td style={tdStyle} className="text-xs">
        {community.points}
      </td>
      <td style={tdStyle} className="text-xs">
        {community.members}
      </td>
    </tr>
  );
};

const ICommunityLeaderBoard: React.FC<CommunityLeaderBoardProps> = ({
  communities,
  onRowClick,
  page,
  firstThree,
}) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="xl:flex gap-2 ">
        {firstThree?.map((community, index) => (
          <div key={community.id} className="mb-4 xl:w-full">
            <IPanel>
              <div className="text-lg pb-2 ">{index + 1}.</div>
              <div className="flex items-center ">
                <div
                  className="pb-2"
                  onClick={() =>
                    navigate(`/community/${community?.name}/${community?.id}`)
                  }
                >
                  <img
                    src={community?.photo}
                    alt={``}
                    style={{ borderRadius: "32px", objectFit: "cover" }}
                    className="w-[64px] h-[64px] mr-2 mb-1"
                  />
                </div>
                <div>
                  <div className="text-md ml-1">{community?.name}</div>
                  <div className="text-xs text-[#7E858B] ml-1">
                    {`${community?.organizerName}`}
                  </div>
                </div>
              </div>
              <div className="flex ">
                <div className="mr-6">
                  <div className="text-xs  text-[#7E858B]">Members</div>
                  <div>{community?.members}</div>
                </div>
                <div className="mr-6">
                  <div className="text-xs text-[#7E858B]">Points</div>
                  <div>{community?.points}</div>
                </div>
                <div>
                  <div className="text-xs">{community?.attribute}</div>
                </div>
              </div>
            </IPanel>
          </div>
        ))}
      </div>
      <div className="rounded overflow-x-auto bg-white">
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle} className="text-xs font-thin ">
                No.
              </th>
              <th style={thStyle} className="text-xs font-thin">
                Name
              </th>

              <th style={thStyle} className="text-xs font-thin">
                Attribute
              </th>
              <th style={thStyle} className="text-xs font-thin">
                Points
              </th>
              <th style={thStyle} className="text-xs font-thin">
                Members
              </th>
            </tr>
          </thead>
          <tbody>
            {communities?.map((community, index) => (
              <TableRow
                key={community.id}
                community={community}
                index={index}
                onRowClick={onRowClick}
                page={page}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ICommunityLeaderBoard;
