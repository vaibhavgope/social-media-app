import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import Login from './Login';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '10%'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
    },
}));

export default function CenteredGrid() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                    <Paper className={classes.paper}>
                        <h1>See what's happening</h1>
                        <h3>Login or signup to our platform to connect with the world!</h3>
                    </Paper>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Paper className={classes.paper}>
                        <h3>Login or signup</h3>
                        <Login buttonText="Login with Google" />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}