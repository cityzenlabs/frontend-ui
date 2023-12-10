import React from "react";

interface ICommunityLeaderBoard {
  communities: any;
  onRowClick: (communityId: string) => void;
}

const ICommunityLeaderBoard: React.FC<ICommunityLeaderBoard> = ({
  communities,
  onRowClick,
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

  const truncateStyle = {
    maxWidth: "150px", // Adjust this value based on your requirements
    whiteSpace: "nowrap" as "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
              Attribute
            </th>
            <th className="text-xs" style={thStyle}>
              Reputation
            </th>
            <th className="text-xs" style={thStyle}>
              Members
            </th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "white" }}>
          {communities?.map((community: any) => (
            <tr
              key={community.id}
              style={{ border: "1px solid #DADEE5" }}
              onClick={() => onRowClick(community.id)}
            >
              <td></td>
              <td style={tdStyle}>
                <div style={tdContentStyle}>
                  <img
                    src={community?.picture || "default-avatar.png"}
                    alt={``}
                    style={imgStyle}
                  />
                  <span
                    className="text-xs"
                    style={truncateStyle}
                  >{`${community?.name}`}</span>
                </div>
              </td>
              <td className="text-xs" style={tdStyle}>
                {community.attribute}
              </td>
              <td className="text-xs" style={tdStyle}>
                {community?.reputation}
              </td>
              <td className="text-xs" style={tdStyle}>
                {community?.memberCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ICommunityLeaderBoard;
