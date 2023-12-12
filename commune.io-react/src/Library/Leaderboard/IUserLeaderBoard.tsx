import React from "react";
import IPanel from "../Panel/IPanel";

import { tableStyle, thStyle, tdStyle, imgStyle } from "./ILeaderBoardStyles";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  picture: string;
  age: number;
  level: number;
  points: number;
  topAttribute: string;
}

interface IUserLeaderBoardProps {
  users: User[];
  onRowClick: (userId: string) => void;
  page: number;
  firstThree: User[];
  picture: string;
}

const TableRow = ({
  user,
  index,
  onRowClick,
  page,
}: {
  user: User;
  index: number;
  onRowClick: (id: string) => void;
  page: number;
}) => {
  return (
    <tr
      key={user.id}
      style={{ border: "1px solid #DADEE5" }}
      onClick={() => onRowClick(user.id)}
    >
      <td style={tdStyle}>{4 + (page - 1) * 7 + index}</td>
      <td style={tdStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={user.picture}
            alt={`${user.firstName} ${user.lastName}`}
            style={imgStyle}
          />
          <span>{`${user.firstName} ${user.lastName}`}</span>
        </div>
      </td>
      <td style={tdStyle}>{user.topAttribute}</td>
      <td style={tdStyle}>{user.level}</td>
      <td style={tdStyle}>{user.points}</td>
    </tr>
  );
};

const IUserLeaderBoard: React.FC<IUserLeaderBoardProps> = ({
  users,
  onRowClick,
  page,
  firstThree,
}) => {
  return (
    <div>
      <div className="xl:flex gap-2">
        {firstThree.map((user, index) => (
          <div key={user.id} className="mb-4 xl:w-full">
            <IPanel>
              <div className="text-lg pb-2 ">{index + 1}.</div>
              <div className="flex items-center ">
                <div className="pb-2">
                  <img
                    src={user?.picture}
                    alt={``}
                    style={{ borderRadius: "32px", objectFit: "cover" }}
                    className="w-[64px] h-[64px] mr-2 mb-1"
                  />
                </div>
                <div>
                  <div className="text-md">
                    {user?.firstName + " " + user?.lastName}{" "}
                  </div>
                </div>
              </div>
              <div className="flex ">
                <div className="mr-6">
                  <div className="text-xs  text-[#7E858B]">Level</div>
                  <div>{user?.level}</div>
                </div>
                <div className="mr-6">
                  <div className="text-xs text-[#7E858B]">Points</div>
                  <div>{user?.points}</div>
                </div>
                <div>
                  <div className="text-xs">{user?.topAttribute}</div>
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
              <th style={thStyle}>Highest Attribute</th>
              <th style={thStyle}>Level</th>
              <th style={thStyle}>Points</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <TableRow
                key={user.id}
                user={user}
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

export default IUserLeaderBoard;
