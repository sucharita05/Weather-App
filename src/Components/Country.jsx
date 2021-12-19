import React, { useEffect, useState } from 'react';
import skynews from '../Images/skynews.jpg';
import { Box, Card, CardMedia, CardContent, Typography, Button, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    component: {
        backgroundImage: `url(${skynews})`,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: 'cover',
    },
    button: {
        background: '#e67e22',
        color: 'white',
        width: 100,
        height: 20,
        marginLeft: 15,
        fontSize: 9
    },
});

const Country = (props) => {
    const [country, setCountry] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        console.log('Received data in country component');
        console.log(props.location.state);
        setCountry(props.location.state);
    });

    const getWeather = (event) => {
        const url = encodeURI('http://api.weatherstack.com/current?access_key=76b0c232eee413991e47131b3b6c82bb&query=' + country.capital[0]);
        fetch(url)
            .then(response => {
                console.log(response.status);
                if (response.status === 404) {

                } else {
                    response.json()
                        .then(data => {
                            console.log(data);
                            event.preventDefault();
                            props.history.push({
                                pathname: '/weather',
                                state: data
                            });
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            {country ? (<Box className={classes.component}
                sx={{
                    width: 500,
                    height: 500,
                }}
            >
                <Card sx={{ maxWidth: 345 }} className={classes.card}>
                <CardContent>
                        <Typography gutterBottom variant="h3" component="div">
                            {country.name.common}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        height="140"
                        image={country.flags.png}
                        alt="flag"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            <List dense={true}>
                                <ListItem>
                                    <ListItemText>
                                        {'Capital: ' + country.capital[0]}
                                        <Button
                                            variant="contained"
                                            className={classes.button} onClick={getWeather}>Get Weather
                                        </Button>
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>{'Population: ' + country.population}</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>{'Latlong: ' + country.latlng}</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>{'Flag: ' + country.flag}</ListItemText>
                                </ListItem>
                            </List>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>) : 'No country data'}
        </>
    )
}

export default Country;
