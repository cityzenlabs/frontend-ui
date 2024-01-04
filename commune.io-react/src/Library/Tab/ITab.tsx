import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

function ITab({ tabValue, handleTabChange, tabs }: any) {
  return (
    <div>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          {tabs?.map((tab: any, index: any) => (
            <Tab key={index} label={tab} />
          ))}
        </Tabs>
      </Box>
    </div>
  );
}

export default ITab;
