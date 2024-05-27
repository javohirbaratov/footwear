import { Tab, Tabs } from '@mui/material';
import React from 'react';

export type TMyTabs = {
  value: number,
  text: string,
  route: string,
}

interface MyTabsProps {
  tabs: TMyTabs[],
  value: number 
  handleChange: (event: React.SyntheticEvent, value: number) => void
  label: string
}

const MyTabs: React.FC<MyTabsProps> = ({ tabs, handleChange, value, label }) => {
  return (
    <>
      <Tabs value={value} onChange={handleChange} aria-label={label}>
        {
          tabs.map((item) => (
            <Tab disableRipple key={item.value} label={item.text} />
          ))
        }
      </Tabs>
    </>
  );
};

export default MyTabs;