import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../pageTitle/PageTitle';
import styles from "./alertFinish.module.css"
import { CheckIcon } from '../../icons';
type TAlertFinishProps = {
  toNavigate: string;
  btnTxt: string;
  caption: string
}

const AlertFinish: React.FC<TAlertFinishProps> = ({ toNavigate, btnTxt, caption }) => {

  const navigate = useNavigate();

  const nadleNavigate = () => {
    navigate(toNavigate);
  }

  return (
    <>
      <Box
        className={styles.alertContainer}
      >
        <Box
          className={styles.alertContent}
        >
          <Box
            className={styles.alertIcon}
          >
            <CheckIcon sx={{fontSize: "74px"}} />
          </Box>
          <Box
            className={styles.alertTxtContainer}
          >
            <PageTitle title='Muvaffaqiyatli' />
            <p>
              {caption}
            </p>
          </Box>
          <LoadingButton
            sx={{
              marginTop: '41px',
            }}
            variant="contained"
            color="secondary"
            type="submit"
            fullWidth
            onClick={() => nadleNavigate()}
          >{btnTxt}</LoadingButton>
        </Box>
      </Box>
    </>
  );
};

export default React.memo(AlertFinish);