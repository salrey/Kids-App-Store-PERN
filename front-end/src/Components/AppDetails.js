import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Rating from '@mui/material/Rating';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';


import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"
import Reviews from './Reviews';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const AppDetails = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [app, setApp] = useState([]);
    const [latestReviews, setLatestReviews] = useState()
    const API = process.env.REACT_APP_API_URL;

   
    useEffect(() => {
        axios.get((`${API}/apps/${id}/reviews`))
        .then((response) => setLatestReviews(response.data.payload))
        .catch((err) => console.warn(err))
    }, [API, id]);



    //grab reviews to get starting average, then parentCallBack to Reviews to capture changes
    const avgRating = latestReviews?.reduce((acc, review) => { return acc+=Number(review.rating)},0) / latestReviews?.length

    useEffect(() => {
        axios.get(API+"/apps/"+id)
        .then((response) => setApp(response.data.payload))
        .catch(() => { navigate("/not-found")})
    }, [API, id, navigate])

    const deleteApp = () => {
        axios.delete(`${API}/apps/${id}`)
        .then(() => navigate("/apps"))
        .catch((e) => console.error(e));
    };

    const handleDelete = () => {
        deleteApp()
    };

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleCart = () => {
        //first check if this item already exists in the cart
        //if not, then proceed to update state for cart (add to array of products in the cart), to populate and display total, total count  
        
        // return navigate("/apps/cart");
    }

    const handleStoreMenu = () => {
        return navigate("/apps");
    }
    
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(event.currentTarget)
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
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
            <MenuItem onClick={()=> {return navigate(`/apps/${id}/edit`)}}><EditIcon className={"me-2"} />Edit</MenuItem>
            <MenuItem onClick={handleDelete}><DeleteOutlineIcon className={"me-2"} />Delete</MenuItem>
        </Menu>
    );

    return (
        <Card sx={{ backgroundColor: "inherit", boxShadow: "none"}}>
            <IconButton onClick={handleStoreMenu}> <ArrowBackIcon className={"me-3"} /> Return to App Store </IconButton>
        <CardHeader
            action={
                <IconButton
                size="large"
                edge="end"
                aria-label="more"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                >
                    <MoreVertIcon />
                </IconButton> 
            }
            title={app?.name}
            subheader={`By ${app?.developer}`}
            />     
            <div className='d-flex'>
            {app?.featured && <Typography 
                component="div" 
                variant="subtitle1"
                sx={{ color: "inherit"}}
                className="mb-4 me-3"
                >
                    <EmojiEventsIcon /> Featured
            </Typography>
            }
            <Rating name="read-only" value={avgRating} readOnly />
        </div>     
        <CardMedia
            component="img"
            height="194"
            image={app?.image}
            alt={app?.name}
            />
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                {app?.category} 
            </Typography>
            <Typography className="mb-2" variant="body2" color="text.secondary">
                {app?.age} 
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {app.price === 0 ? "FREE" : Number(app.price).toLocaleString('en-US', {     
                style: 'currency',     
                currency: 'USD',     
                currencyDisplay: 'symbol'})} 
            </Typography>
            <Typography className="mb-2 mt-2" variant="body2" color="text.secondary">
                {app?.description}
            </Typography>
            <Button className="mt-2" variant="outlined" onClick={handleCart}><AddShoppingCartIcon className={"me-3"} /> Buy Now</Button>
        </CardContent>
        <CardActions disableSpacing>
            Reviews
            <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
            <ExpandMoreIcon />
            </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
            {<Reviews parentCallBackReviews={setLatestReviews} />}
            </CardContent>
        </Collapse>
        {renderMenu}
        </Card>
    );
}

export default AppDetails;
  
