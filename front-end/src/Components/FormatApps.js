import { Link } from "react-router-dom";

import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const FormatApps = ({ app }) => {
  return (
    <div className="App">
      <Link to={`/apps/${app.id}`}>
        <ImageListItem >
        <img
          src={app.image}
          srcSet={app.image}
          alt={app.name}
          loading="lazy"
        />
        <ImageListItemBar
          title={app.name}
          subtitle={<><span className="">By {app.developer}</span><div className="mt-2">{app.price === 0 ? "FREE" : Number(app.price).toLocaleString('en-US', {     
            style: 'currency',     
            currency: 'USD',     
            currencyDisplay: 'symbol'})}</div></>} 
          actionIcon={
            <IconButton
              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              aria-label={`info about ${app.name}`}
            >
              {app.featured && <EmojiEventsIcon />}
            </IconButton>
          }
        />
      </ImageListItem>
      </Link>
    </div>
    
  );
}

export default FormatApps;
