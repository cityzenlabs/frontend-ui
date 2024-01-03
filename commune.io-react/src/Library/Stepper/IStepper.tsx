import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

interface IStepperProps {
  steps: string[];
  activeStep: number;
}

export default function IStepper({ steps, activeStep }: IStepperProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep - 1} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
