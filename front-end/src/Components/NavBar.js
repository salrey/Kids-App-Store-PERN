import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import AppsIcon from '@mui/icons-material/Apps';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import appLogo from "../assets/Logo.png"
import avatarLogo from "../assets/Avatars.png"

//React Router
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

//helper functions below 

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: "100px",
  backgroundColor: "#8C8BD6",
  '&:hover': {
    backgroundColor: "#A7A6E7",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

//helper functions above 

const NavBar = ({update}) => {
  const navigate = useNavigate()
  const [total, setTotal] = useState();  
  const URL = process.env.REACT_APP_API_URL;
  const sum = (apps) => {
    return apps.reduce((acc, _) => acc += 1,0)
  }

  // Backlog - CART TABLE fetch the latest array of products in cart, then track every change thereafter  
  // const latestCart = cart
  
  useEffect(() => {
    axios.get(`${URL}/apps`)
    .then((response) => {
      return setTotal(sum(response.data.payload))
    })
    .catch((e) => console.error("catch", e));
  }, [URL])

  const display = update === undefined ? total : update

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleCart = () => {
    return navigate("/apps/cart");
  }

  const handleNewApp = () => {
    return navigate("/apps/new");
  }

  const handleStoreMenu = () => {
    return navigate("/apps");
  }
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleHomeLogo = () => {
      return navigate("/");
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleStoreMenu}>
        <IconButton 
          size="large" 
          aria-label={`show ${display} new mails`} 
          color="inherit">
          <Badge badgeContent={display} color="primary" >
            <AppsIcon />
          </Badge>
        </IconButton>
        <Button color="secondary">App Store</Button>
      </MenuItem>
      <MenuItem onClick={handleNewApp}>
        <IconButton
          size="large"
          aria-label="show 1 new notifications"
          color="inherit"
        >
          <Badge badgeContent={1} color="primary">
            <AppRegistrationIcon />
          </Badge>
        </IconButton>
        <Button color="secondary">List an App</Button>
      </MenuItem>
      <MenuItem onClick={handleCart}>
        <IconButton
          size="large"
          aria-label="show 1 new notifications"
          color="inherit"
        >
          <Badge badgeContent={2} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <Button color="secondary">Shopping Cart</Button>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar alt="Cindy Baker" src={avatarLogo} />
        </IconButton>
        <Button color="secondary">Account</Button>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{background:"#9FC1EE"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="home"
            onClick={handleHomeLogo}
          >
            <img src={appLogo} alt="app-logo" style={{width: "80px"}} />
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton 
              size="large" 
              aria-label={`show ${display} new mails`} 
              color="inherit" 
              onClick={handleStoreMenu}>
              <Badge badgeContent={display} color="primary">
                <AppsIcon />
              </Badge>
            </IconButton>
            <Button color="inherit" onClick={handleStoreMenu}>App Store</Button>
            <IconButton
              size="large"
              aria-label="show 1 new notifications"
              color="inherit"
              onClick={handleNewApp}
            >
              <Badge badgeContent={1} color="primary">
                <AppRegistrationIcon />
              </Badge>
            </IconButton>
            <Button color="inherit" onClick={handleNewApp}>List an App</Button>
            <IconButton
              size="large"
              aria-label="show 1 new notifications"
              color="inherit"
              onClick={handleCart}
            >
              <Badge badgeContent={2} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Button color="inherit" onClick={handleCart}>Shopping Cart</Button>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar alt="Cindy Baker" src={avatarLogo} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export default NavBar;
