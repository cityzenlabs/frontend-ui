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

interface IUserTableProps {
  users: User[];
}

const IUserTable: React.FC<IUserTableProps> = ({ users }) => {
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
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Highest Attribute</th>
            <th style={thStyle}>Points</th>
            <th style={thStyle}>Level</th>
            <th style={thStyle}>Age</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "white" }}>
          {users?.map((user) => (
            <tr key={user.id} style={{ border: "1px solid #DADEE5" }}>
              <td style={tdStyle}>
                <div style={tdContentStyle}>
                  <img
                    src={user.picture || "default-avatar.png"}
                    alt={`${user.firstName} ${user.lastName}`}
                    style={imgStyle}
                  />
                  <span>{`${user.firstName} ${user.lastName}`}</span>
                </div>
              </td>
              <td style={tdStyle}>{user.topAttribute}</td>
              <td style={tdStyle}>{user.points}</td>
              <td style={tdStyle}>{user.level}</td>
              <td style={tdStyle}>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IUserTable;
