import * as React from 'react';
// import Button from '../Button';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import ProductHeroLayout from './ProductHeroLayout';

const backgroundImage =
  'https://t4.ftcdn.net/jpg/04/67/59/25/360_F_467592556_ZWEXBysitotqf2elYGcxY3HQ26PoBiyM.jpg';

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
      Supercharge Your Business Solutions
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
Unlock the power of technology with Smart Solutions, your trusted IT consulting partner.
      </Typography>

      <Button
  color="secondary"
  variant="contained"
  size="large"
  component="a"
  href="/signin"
  sx={{
    minWidth: 200,
    bgcolor: '#e7b10a', // Set the background color to #e7b10a
    '&:hover': {
      bgcolor: '#e7b10a',color:'black', // Set the background color on hover to #e7b10a
    },
  }}
>
  Register
</Button>
      
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
      Experience Next-Level Transformation
      </Typography>
    </ProductHeroLayout>
  );
}