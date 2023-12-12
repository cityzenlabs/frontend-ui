import React from "react";

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

interface IUserLeaderBoard {
  users: User[];
  onRowClick: (userId: string) => void;
  picture: string;
  page: number;
}

const IUserLeaderBoard: React.FC<IUserLeaderBoard> = ({
  users,
  onRowClick,
  picture,
  page,
}) => {
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse" as "collapse",
  };

  const thStyle = {
    textAlign: "left" as "left",
    padding: "8px",
    backgroundColor: "#5081FF",
    color: "white",
  };

  const tdStyle = {
    textAlign: "left" as "left",
    padding: "8px",
  };

  const imgStyle = {
    width: "30px",
    height: "30px",
    borderRadius: "15px",
    objectFit: "cover" as "cover",
    marginRight: "8px",
  };

  const tdContentStyle = {
    display: "flex", // Use flexbox to lay out children inline
    alignItems: "center", // Center children vertically within the td
    gap: "10px", // Add some space between the image and the text
  };

  return (
    <div className="rounded" style={{ width: "100%", overflowX: "auto" }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th className="text-xs" style={thStyle}>
              No.
            </th>
            <th className="text-xs" style={thStyle}>
              Name
            </th>
            <th className="text-xs" style={thStyle}>
              Highest Attribute
            </th>
            <th className="text-xs" style={thStyle}>
              Level
            </th>

            <th className="text-xs" style={thStyle}>
              Points
            </th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "white" }}>
          {users?.map((user, index) => (
            <tr
              key={user.id}
              style={{ border: "1px solid #DADEE5" }}
              onClick={() => onRowClick(user.id)}
            >
              <td className="text-xs" style={tdStyle}>
                {4 + (page - 1) * 7 + index}
              </td>
              <td style={tdStyle}>
                <div style={tdContentStyle}>
                  <img
                    src={picture}
                    alt={`${user.firstName} ${user.lastName}`}
                    style={imgStyle}
                  />
                  <span className="text-xs">{`${user.firstName} ${user.lastName}`}</span>
                </div>
              </td>
              <td className="text-xs" style={tdStyle}>
                {user?.topAttribute}
              </td>
              <td className="text-xs" style={tdStyle}>
                {user.level}
              </td>
              <td className="text-xs" style={tdStyle}>
                {user.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IUserLeaderBoard;
