import { LoadingButton } from '@mui/lab';
import { Toolbar } from '@mui/material';
import React from 'react';
import styles from "./nextButton.module.css";
interface NextButtonProps {
  isDisabled: boolean,
  isLoading?: boolean, 
  handleNext?: () => void
}

const NextButton: React.FC<NextButtonProps> = ({ handleNext, isDisabled, isLoading }) => {
  return (
    <> 
    <div className={styles.nextButton}>
      {
        handleNext ? (
          <LoadingButton
            variant="contained"
            color="secondary"
            type="submit"
            disabled={isDisabled}
            loading={isLoading||false}
            onClick={() => handleNext()}
            sx={{ maxWidth: '400px', width: "calc(100vw - 40px)" }}
          // loading={isLoading}
          >
            Keyingi
          </LoadingButton>
        ) : (
          <LoadingButton
            variant="contained"
            color="secondary"
            type="submit"
            disabled={isDisabled}
            sx={{ maxWidth: '400px', width: "calc(100vw - 40px)" }}
          // loading={isLoading}
          >
            Keyingi
          </LoadingButton>
        )
      }

    </div>
    <Toolbar sx={{mb:3}} />
    </>
  );
};

export default React.memo(NextButton);