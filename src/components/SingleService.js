import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';

// style css
import '../styles/services.css';

// this is for the card image
import downloadImage from '../images/download.jpg';

const defaultTheme = createTheme();

const SingleService = () => {
    const { id } = useParams(); // Access the ID from the URL parameter

    // get user id
    var userId = sessionStorage.getItem("user_id");
    var username = sessionStorage.getItem("user_name");

    const [service, setService] = useState(null);

  const getService = (serviceId) => {
    axios.get(`http://localhost/brief6/services/${serviceId}`)
      .then((response) => {
        console.log(response.data);
        setService(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getService(id);
}, [id]);

    // save contract in database
    const [inputs, setInputs] = useState({})

    const handleChange = (event) =>{
        const name =event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value}));
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        axios.post('http://localhost/react/contractAPI/contract/save', inputs).then(function(response){
            console.log(response.data);
        });
    };

    // todays date
    const currentDate = new Date().toISOString().split('T')[0];

    // Function to calculate expiry date based on current date and time (in days)
    const calculateExpiryDate = (time) => {
        const currentDate = new Date();
        const expiryDate = new Date();
        expiryDate.setDate(currentDate.getDate() + time);
        return expiryDate.toISOString().split('T')[0];
    };

    // for the pricing
    const tiers = [
        {
            title: '1 month',
            price: service ? `${service.cost_3month}` : '',
            description: [],
            time: 30,
            buttonText: 'Sign contract',
            buttonVariant: 'outlined',
            expiryDate: calculateExpiryDate(30), // Calculate expiry date for 30 days
        },
        {
            title: '2 months',
            price: service ? `${service.cost_3month * 2}` : '',
            description: [],
            time: 60,
            buttonText: 'Sign contract',
            buttonVariant: 'outlined',
            expiryDate: calculateExpiryDate(60), // Calculate expiry date for 60 days
        },
        {
            title: '3 months',
            price: service ? `${service.cost_3month * 3}` : '',
            description: [],
            time: 90,
            buttonText: 'Sign contract',
            buttonVariant: 'outlined',
            expiryDate: calculateExpiryDate(90), // Calculate expiry date for 90 days
        },
    ];

    // Define a variable to hold the selected tier's expiry date
    const [selectedExpiryDate, setSelectedExpiryDate] = useState('');

    // Define a variable to hold the selected tier's price
    const [selectedTierPrice, setSelectedTierPrice] = useState('');

    // style for pop up
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = React.useState(false);

    const handleOpen = (expiryDate, price) => {
        setSelectedExpiryDate(expiryDate);
        setSelectedTierPrice(price);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    // Render the service data
    return (
        <div>
            <div className="container-singleservice">
                <div className="left">
                    <h2>{service ? service.service_name : ''}</h2>
                    <p>{service ? service.description : ''}</p>
                </div>
                <div className="right">
                    <img src={downloadImage} alt="Service" />
                </div>
            </div>
            <ThemeProvider theme={defaultTheme}>
                <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
                <CssBaseline />
                <Container maxWidth="md" component="main">
                    <Grid container spacing={5} alignItems="flex-end">
                        {tiers.map((tier) => (
                            // Enterprise card is full width at sm breakpoint
                            <Grid
                                item
                                key={tier.title}
                                xs={12}
                                sm={tier.title === 'Enterprise' ? 12 : 6}
                                md={4}
                            >
                                <Card>
                                    <CardHeader
                                        title={tier.title}
                                        subheader={tier.subheader}
                                        titleTypographyProps={{ align: 'center' }}
                                        action={tier.title === 'Pro' ? <StarIcon /> : null}
                                        subheaderTypographyProps={{
                                            align: 'center',
                                        }}
                                        sx={{
                                            backgroundColor: (theme) =>
                                                theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
                                        }}
                                    />
                                    <CardContent>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'baseline',
                                                mb: 2,
                                            }}
                                        >
                                            <Typography component="h2" variant="h3" color="text.primary">
                                                {tier.price}
                                            </Typography>
                                            <Typography variant="h6" color="text.secondary">
                                                $
                                            </Typography>
                                        </Box>
                                        <ul>
                                            {tier.description.map((line) => (
                                                <Typography
                                                    component="li"
                                                    variant="subtitle1"
                                                    align="center"
                                                    key={line}
                                                >
                                                    {line}
                                                </Typography>
                                            ))}
                                        </ul>
                                    </CardContent>

                                    <CardActions>
                                        <Button
                                            fullWidth
                                            variant={tier.buttonVariant}
                                            onClick={() => handleOpen(tier.expiryDate, tier.price)}
                                        >
                                            {tier.buttonText}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    {/* this is for the pop up */}
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 2 },
                                }}
                                noValidate
                                autoComplete="off"
                                onSubmit={handleSubmit}

                            >
                                <h3>{service ? service.service_name : ''}</h3>
                                <TextField
                                    id="standard-required"
                                    label="User Name"
                                    defaultValue={username}
                                    variant="standard"
                                    disabled
                                    onChange={handleChange}
                                    name={username}
                                />
                                <TextField
                                    id="standard-required"
                                    label="Price"
                                    defaultValue={`$${selectedTierPrice}`}
                                    variant="standard"
                                    disabled
                                    onChange={handleChange}
                                    name='price'
                                />
                                <TextField
                                    id="standard-required"
                                    label="Service_id"
                                    defaultValue={service ? service.id : ''}
                                    variant="standard"
                                    type="hidden"
                                    onChange={handleChange}
                                    name='serviceid'
                                />
                                <TextField
                                    id="standard-required"
                                    label="user_id"
                                    defaultValue={userId}
                                    variant="standard"
                                    type="hidden"
                                    onChange={handleChange}
                                    name={userId}
                                />
                                <TextField
                                    id="standard-required"
                                    label="StartDate"
                                    defaultValue={currentDate}
                                    variant="standard"
                                    type="date"
                                    disabled
                                    InputProps={{ classes: { disabled: 'disabled-input' } }}
                                    onChange={handleChange}
                                    name='startdate'
                                />
                                <TextField
                                    id="standard-required"
                                    label="ExpireDate"
                                    defaultValue={selectedExpiryDate}
                                    variant="standard"
                                    type="date"
                                    disabled
                                    InputProps={{ classes: { disabled: 'disabled-input' } }}
                                    onChange={handleChange}
                                    name='expiredate'
                                />
                                <TextareaAutosize
                                    id="standard-multiline-flexible"
                                    aria-label="Description"
                                    defaultValue="I need IT services for my small business. We have a network of 10 computers and require assistance with software installation, network security, and regular system maintenance."
                                    minRows={4}
                                    disabled
                                    onChange={handleChange}
                                    name='description'
                                />
                                <Button variant="outlined" onClick={handleSubmit}>Submit Contract</Button>
                            </Box>
                        </Box>
                    </Modal>
                </Container>
            </ThemeProvider>
        </div>
    );
};

export default SingleService;
