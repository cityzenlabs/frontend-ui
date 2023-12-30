import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

function ITab({ tabValue, handleTabChange }: any) {
  return (
    <div>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Details" />
          <Tab label="Photos" />
        </Tabs>
      </Box>
    </div>
  );
}

export default ITab;
