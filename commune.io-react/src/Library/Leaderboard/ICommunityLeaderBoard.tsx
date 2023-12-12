import React from "react";
import IPanel from "../Panel/IPanel";
import { tableStyle, thStyle, tdStyle, imgStyle } from "./ILeaderBoardStyles";

// TypeScript interface for a community
interface Community {
  id: string;
  name: string;
  picture: string;
  organizerFirstName: string;
  organizerLastName: string;
  members: number;
  points: number;
  attribute: string;
}

// Props interface for ICommunityLeaderBoard component
interface ICommunityLeaderBoardProps {
  communities: Community[];
  onRowClick: (communityId: string) => void;
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
  onRowClick: (id: string) => void;
  page: number;
}) => {
  return (
    <tr
      key={community.id}
      style={{ border: "1px solid #DADEE5" }}
      onClick={() => onRowClick(community.id)}
    >
      <td style={tdStyle}>{4 + (page - 1) * 7 + index}</td>
      <td style={tdStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={community.picture}
            alt={`${community.name}`}
            style={imgStyle}
          />
          <span>{community.name}</span>
        </div>
      </td>
      <td
        style={tdStyle}
      >{`${community.organizerFirstName} ${community.organizerLastName}`}</td>
      <td style={tdStyle}>{community.attribute}</td>
      <td style={tdStyle}>{community.points}</td>
    </tr>
  );
};

const ICommunityLeaderBoard: React.FC<ICommunityLeaderBoardProps> = ({
  communities,
  onRowClick,
  page,
  firstThree,
}) => {
  return (
    <div>
      <div className="xl:flex gap-2">
        {firstThree.map((community, index) => (
          <div key={community.id} className="mb-4 xl:w-full">
            <IPanel>
              <div className="text-lg pb-2 ">{index + 1}.</div>
              <div className="flex items-center ">
                <div className="pb-2">
                  <img
                    src={community.picture}
                    alt={``}
                    style={{ borderRadius: "32px", objectFit: "cover" }}
                    className="w-[64px] h-[64px] mr-2 mb-1"
                  />
                </div>
                <div>
                  <div className="text-md">{community.name}</div>
                  <div className="text-xs text-[#7E858B]">
                    {`${community.organizerFirstName} ${community.organizerLastName}`}
                  </div>
                </div>
              </div>
              <div className="flex ">
                <div className="mr-6">
                  <div className="text-xs  text-[#7E858B]">Members</div>
                  <div>{community.members}</div>
                </div>
                <div className="mr-6">
                  <div className="text-xs text-[#7E858B]">Points</div>
                  <div>{community.points}</div>
                </div>
                <div>
                  <div className="text-xs">{community.attribute}</div>
                </div>
              </div>
            </IPanel>
          </div>
        ))}
      </div>
      <div className="rounded overflow-x-auto">
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>No.</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Organizer</th>
              <th style={thStyle}>Attribute</th>
              <th style={thStyle}>Points</th>
            </tr>
          </thead>
          <tbody>
            {communities.map((community, index) => (
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
