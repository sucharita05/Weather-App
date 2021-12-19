import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, makeStyles } from '@material-ui/core';
import { Alert, AlertTitle, gridClasses } from '@mui/material';
import weather from '../Images/weather.jpg';

const useStyles = makeStyles({
    div: {
        backgroundImage: `url(${weather})`,
        backgroundSize: 'cover',
        color: '#18191c',
    },
    component: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    h1: {
        display: 'block',
        margin: 'auto',
        textAlign: 'center',
    },
    input: {
        color: 'black',
        fontSize: 30,
        marginRight: 15,
    },
    labelRoot: {
        fontSize: 20,
        color: 'black'
    },
    button: {
        background: '#e67e22',
        color: 'black',
        width: 150,
        height: 50,
        marginTop: 5
    }
});

const Form = (props) => {
    const [country, setCountry] = useState('');
    const [editable, setEditable] = useState(true);
    const [visible, setVisible] = useState(false);
    const [invalidCountry, setInvalidCountry] = useState(false);
    const classes = useStyles();

    const updateCountry = (event) => {
        setCountry(event.target.value);
    };

    useEffect(() => {
        if (country && country.length > 0) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [country])

    const searchCountry = (event) => {
        setEditable(false);
        setInvalidCountry(false);
        const url = 'https://restcountries.com/v3.1/name/' + country + '?fullText=true';
        fetch(url)
            .then(response => {
                console.log(response.status);
                if (response.status === 404) {
                    setInvalidCountry(true);
                } else {
                    setInvalidCountry(false);
                    response.json()
                        .then(data => {
                            console.log(data);
                            event.preventDefault();
                            props.history.push({
                                pathname: '/country',
                                state: data[0]
                            });
                        });
                }
                setEditable(true);
            })
            .catch((error) => {
                setEditable(true);
                console.error('Error:', error);
            });
    }

    return (
        <div className={classes.div}>
        <h1 className={classes.h1}>Welcome to Weather App</h1>
            <Box className={classes.component}>
                <TextField
                    InputProps={{ className: classes.input }}
                    className={classes.input}
                    label="Country"
                    InputLabelProps={{
                        classes: { root: classes.labelRoot }
                    }}
                    disabled={!editable}
                    value={country} onChange={updateCountry}
                />
                <Button
                    variant="contained"
                    disabled={!visible}
                    className={classes.button} onClick={searchCountry}>Get Details
                </Button><br />
                {invalidCountry ? (<Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Kindly enter a valid country name
                </Alert>) : ''}
            </Box>
        </div>
    )
}

export default Form;
