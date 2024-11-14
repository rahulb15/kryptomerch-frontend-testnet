import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const merchandiseItems = [
  { id: 1, name: 'T-Shirt', price: '$19.99', image: 'assets-images/marchendies-img2.png' },
  { id: 2, name: 'Mug', price: '$9.99', image: 'assets-images/marchendies-img2.png' },
  { id: 3, name: 'Cap', price: '$14.99', image: 'assets-images/marchendies-img2.png' },
  { id: 4, name: 'Hoodie', price: '$39.99', image: 'assets-images/marchendies-img2.png' },
];

const MerchModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="merch-modal-title"
      aria-describedby="merch-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' },
        maxWidth: 800,
        maxHeight: '90vh',
        overflow: 'auto',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography id="merch-modal-title" variant="h4" component="h2" gutterBottom sx={{  color: 'primary.main' }}>
          Merchandise Store
        </Typography>
        <Grid container spacing={3}>
          {merchandiseItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image}
                  alt={item.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.price}
                  </Typography>
                  <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Modal>
  );
};

MerchModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MerchModal;