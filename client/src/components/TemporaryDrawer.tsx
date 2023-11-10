'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CarRentalIcon from '@mui/icons-material/CarRental';
import Link from 'next/link';

const sharedMenuItems = [{
  title: 'Home',
  icon: <HomeIcon />,
  destination: "/home"
}]

const userMenuItems = [{
  title: 'Mis reservas',
  icon: <ChecklistIcon />,
  destination: "/home/bookings"
}]

const adminMenuItems = [{
  title: 'Administrar autos',
  icon: <CarRentalIcon />,
  destination: "/home"
}, {
  title: 'Administrar reservas',
  icon: <ChecklistIcon />,
  destination: "/bookings"
}]

interface TemporaryDrawerProps {
  isAdmin: Boolean
}

const TemporaryDrawer: React.FC<TemporaryDrawerProps> = ({ isAdmin }) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer =
    (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setOpen(open);
      };

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {sharedMenuItems.map((item, index) => (
          <Link key={index} href={item.destination}>
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {isAdmin && (
          adminMenuItems.map((item, index) => (
            <Link key={index} href={item.destination}>
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))
        ) || (
            userMenuItems.map((item, index) => (
              <Link key={index} href={item.destination}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))
          )}
      </List>
    </Box>
  );

  return (
    <div>
      {
        <React.Fragment>
          <Button onClick={toggleDrawer(true)}><MenuIcon sx={{ color: 'white', fontSize: '2rem' }} /></Button>
          <Drawer
            anchor='left'
            open={open}
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
        </React.Fragment>
      }
    </div>
  );
}

export default TemporaryDrawer