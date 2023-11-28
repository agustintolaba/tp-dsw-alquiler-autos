'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import TemporaryDrawer from './TemporaryDrawer';
import { color } from '@mui/system';
import { useRouter } from 'next/navigation';
import { TOKEN_STORAGE_KEY } from '@/utils/constants';
import Image from 'next/image';
import Link from 'next/link';

interface MenuAppBarProps {
  isAdmin: boolean
}

const MenuAppBar: React.FC<MenuAppBarProps> = ({ isAdmin }) => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    handleClose()
    if (confirm("¿Desea cerrar sesión?")) {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY)
      router.replace('/')
    }
  };

  return (
    <AppBar
      position="static"
    >
      <Toolbar>
        <TemporaryDrawer />
        <Link href='/home' className='flex flex-row items-center gap-4 justify-center grow opacity-50'>
          <span className='hidden sm:flex text-xl text-white'>RUEDA</span>
          <Image
            className='invert'
            src={'/assets/images/company-logo.png'}
            alt='logo'
            width={80}
            height={80}
          />
          <span className='hidden sm:flex text-xl text-white'>LIBRE</span>
        </Link>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Perfil</MenuItem>
            <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default MenuAppBar