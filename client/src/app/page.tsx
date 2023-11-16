'use client'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserRegistrationForm from '@/components/UserRegisterForm';
import Link from 'next/link';
import { Button } from '@mui/material';
import LoginForm from '@/components/LoginForm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Application = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className='flex flex-col p-8'>
      <h1 className='text-4xl font-bold'>Bienvenido!</h1>
      <div className='flex justify-center max-w-screen'>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs centered={true} value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Log in" {...a11yProps(0)} />
              <Tab label="Registro" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <LoginForm />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <UserRegistrationForm />
          </CustomTabPanel>          
        </Box>
      </div>
    </div>
  );
}

export default Application