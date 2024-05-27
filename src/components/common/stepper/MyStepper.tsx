import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

interface StepperProps {
  steps: string[], 
  activeStep: number,
  setActiveStep: (index:number) => void
}

const MyStepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  setActiveStep
}) => {

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                onClick={() => setActiveStep(index)}
              >{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>
  );
};

export default React.memo(MyStepper);
