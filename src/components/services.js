import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';

// this is for the card image
import downloadImage from '../images/download.jpg';


const defaultTheme = createTheme();

const Services = () => {
    // State to store the data retrieved from the API
    const [services, setServices] = useState([]);

    useEffect(() => {
        getServices();
    }, []);

    function getServices() {
        // API request to retrieve the data
        axios.get('http://localhost/brief6/services/')
            .then(function (response) {
                console.log(response.data);
                setServices(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <main>
                <Container sx={{ py: 8 }} >
                <Typography gutterBottom variant="h5" component="h2">
                Our Services                           
                </Typography>
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {/* Generate cards dynamically based on the API response */}
                        {services.map((service, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                        }}
                                        image={downloadImage} // Display the image URL from the API response
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {service.service_name} {/* Display the title from the API response */}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="h2" sx={{ color: '#6376d2', fontSize: '14px' }}>
                                            {service.cost_3month}$ /perMonth {/* Display the cost from the API response */}
                                        </Typography>
                                        {/* <Typography>{service.description}</Typography> Display the description from the API response */}
                                    </CardContent>
                                    <CardActions>
                                        <Link to={`/details/${service.id}`}>
                                            <Button size="small">View</Button>
                                        </Link>   
                                        {/* <Button size="small">Edit</Button> */}
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
    );
}

export default Services;
