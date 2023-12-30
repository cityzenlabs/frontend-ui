import React from "react";

interface IReputationBarProps {
  reputation: number; // A number between 0 and 100 representing the reputation score
  color: string; // Color of the filled portion of the progress bar
}

const IReputationBar: React.FC<IReputationBarProps> = ({
  reputation,
  color,
}) => {
  return (
    <div className="w-full">
      <div className="text-xs text-[#7E858B] mb-1">
        Reputation - {reputation}
      </div>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "8px", // You can adjust the height as needed
          backgroundColor: "#E6E6E6", // This is the color for the unfilled part of the bar
          borderRadius: "15px", // Optional: if you want rounded corners
        }}
      >
        <div
          className={`bg-${color}`}
          style={{
            position: "absolute",
            width: `${reputation}%`, // Width of the filled portion based on the reputation score
            height: "100%", // Color of the filled portion of the progress bar
            borderRadius: "15px", // Optional: if you want rounded corners
          }}
        ></div>
      </div>
    </div>
  );
};

export default IReputationBar;
