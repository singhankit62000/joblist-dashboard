import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardHeader, Fab } from '@mui/material';

import './JobItem.css';

function JobItem() {

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
      <div className='job-duration' variant='extended' size='small'>
        ⌛Posted 10 days ago
      </div>
      <div className='header-container'>
        <Avatar
            alt="company logo"
            src="https://logo.clearbit.com/dropbox.com"
            sx={{ width: 24, height: 24 }}
            variant="square"
        />
        <div className='header-details'>
          <h3 className='header-company-name'>Zuma</h3>
          <h4 className='header-role'>Founding Staff Frontend Software</h4>
          <p className='header-location'>Bengaluru</p>
        </div>
      </div>
      {/* <CardHeader
        avatar = {
            <Avatar
                alt="company logo"
                src="https://logo.clearbit.com/dropbox.com"
                sx={{ width: 24, height: 24 }}
                variant="square"
            />
        }
        title="Company Name"
        subheader="Role"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </div>
  )
}

export default JobItem