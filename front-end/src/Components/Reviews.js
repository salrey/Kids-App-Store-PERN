import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import Rating from '@mui/material/Rating';
import { deepPurple } from '@mui/material/colors';




import axios from "axios";
import { useEffect, useState } from "react";
import  { useParams } from "react-router-dom";
// import FormatReviews from "./FormatReviews";


const API = process.env.REACT_APP_API_URL;

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
});

const Reviews = ({parentCallBackReviews}) => {
    const [ reviews, setReviews ] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get((`${API}/apps/${id}/reviews`))
        .then((response) => setReviews(response.data.payload))
        .catch((err) => console.warn(err))
    }, [id]);

    useEffect(() => {
        parentCallBackReviews(reviews)
    }, [parentCallBackReviews, reviews])
        
    return (
        <section className="Reviews ">
            <React.Fragment >
                <CssBaseline />
                <Paper square sx={{ pb: '50px', bgcolor: 'inherit' }}>
                    <List sx={{ mb: 2 }}>
                    {reviews.map(({ id, title, content, rating }) => (
                        <React.Fragment key={id}>
                            <ListSubheader>
                                <div className='btn btn-outline-primary'>Options</div>
                            </ListSubheader>
                        <ListItem button>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: deepPurple[500] }}>C</Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                                {title}
                            </ListItemText>
                            <ListItemText >
                                {content}
                            </ListItemText>
                            <Rating name="read-only" value={rating} readOnly />
                        </ListItem>
                        </React.Fragment>
                    ))}
                    </List>
                </Paper>
                <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                    <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer">
                        <MenuIcon />
                    </IconButton>
                    <StyledFab color="secondary" aria-label="add">
                        <AddIcon />
                    </StyledFab>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton color="inherit">
                        <SearchIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <MoreIcon />
                    </IconButton>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        </section>
    )
}

export default Reviews;