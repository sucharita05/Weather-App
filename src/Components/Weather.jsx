import React, { useEffect, useState } from 'react';
import { Box, Card, CardMedia, CardContent, Typography, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import sky from '../Images/sky.jpeg';

const useStyles = makeStyles({
    component: {
        backgroundImage: `url(${sky})`,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: 'cover',
    },
    button: {
        background: '#e67e22',
        color: 'black',
        width: 150,
        height: 50,
        marginTop: 5
    }
});

const Weather = (props) => {
    const [weather, setWeather] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        console.log('Received data in weather component');
        console.log(props.location.state);
        setWeather(props.location.state);
    });
    return (
        <>
            {weather ? (<Box className={classes.component}
                sx={{
                    width: 300,
                    height: 300,
                }}
            >
                <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            {weather.location.name}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        height="140"
                        image={weather.current.weather_icons[0]}
                        alt="flag"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            <List dense={true}>
                                <ListItem>
                                    <ListItemText>
                                        {'Temperature: ' + weather.current.temperature + ' degC'}
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        {'Description: ' + weather.current.weather_descriptions[0] }
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>{'Wind Speed: ' + weather.current.wind_speed + ' kmph'}</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>{'Humidity: ' + weather.current.humidity + '%'}</ListItemText>
                                </ListItem>
                            </List>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>) : 'No weather data'}
        </>
    )
}

export default Weather
