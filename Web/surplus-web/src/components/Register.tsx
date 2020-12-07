import React, { useState } from "react";
import Header from "./Header";
import {
  makeStyles, createStyles, Container, Typography,
  Box, Grid, Checkbox, FormControlLabel,
  Link, TextField, CssBaseline, Button, Avatar
} from '@material-ui/core';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

type RegisterState = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

const useStyles = makeStyles((theme) => createStyles({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register: React.FC = () => { 
    const [profile, setProfile] = useState<Partial<RegisterState>>({});  

 const validate = () => {
  return true;
}

const register = async () => {}

  const onProfileUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {      
      setProfile({...profile, [event.target.name]: event.target.value});
  }

  const registerClick = () => {
    if (validate()) {
      register();
    }
  };  
    
    const classes = useStyles();
    return (
      <div>
        <Header />
        <div className="center">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <ValidatorForm className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth                      
                      label="First Name"
                      autoFocus
                      onChange={onProfileUpdate}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth                      
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      onChange={onProfileUpdate}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextValidator
                      variant="outlined"
                      required
                      fullWidth                      
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={profile.email}
                      onChange={onProfileUpdate}
                      validators={['required', 'isEmail']}
                      errorMessages={['this field is required', 'Email is not valid']}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"                      
                      autoComplete="current-password"
                      onChange={onProfileUpdate}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive notifications via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={registerClick}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </ValidatorForm>
            </div>
            <Box mt={5}>
              <Typography variant="body2" color="textSecondary" align="center">
                {"Copyright © "}
                <Link color="inherit" href="https://surpluseats.com/">
                  Surplus Eats
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
              </Typography>
            </Box>
          </Container>
        </div>
      </div>
    );    
}

export default Register;
