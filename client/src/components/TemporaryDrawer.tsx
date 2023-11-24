'use client'
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
import Link from 'next/link';
import { CarRental, People } from '@mui/icons-material';
import { useState, useEffect, Fragment } from 'react';
import { verifyAdmin } from '@/services/user';
import { useRouter } from 'next/navigation';

const sharedMenuItems = [{
  title: 'Home',
  icon: <HomeIcon />,
  destination: "/home"
}]

const userMenuItems = [{
  title: 'Mis reservas',
  icon: <ChecklistIcon />,
  destination: "/home/bookings"
}, {
  title: 'Vehículos disponibles',
  icon: <CarRental />,
  destination: "/home/vehicles"
}]

const adminMenuItems = [{
  title: 'Administrar reservas',
  icon: <ChecklistIcon />,
  destination: "/home/bookings"
}, {
  title: 'Administrar vehículos',
  icon: <CarRental />,
  destination: "/home/vehicles"
}, {
  title: 'Administrar usuarios',
  icon: <People />,
  destination: "/home/users"
}]

const TemporaryDrawer: React.FC = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      verifyAdmin()
        .then((isAdmin) => {
          setIsAdmin(isAdmin)
        })
        .catch((error: any) => {
          alert('Error al verificar acceso')
          router.replace('/')
        })
    }
    fetchData()
  })

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
        <Fragment>
          <Button onClick={toggleDrawer(true)}><MenuIcon sx={{ color: 'white', fontSize: '2rem' }} /></Button>
          <Drawer
            anchor='left'
            open={open}
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
        </Fragment>
      }
    </div>
  );
}

export default TemporaryDrawer