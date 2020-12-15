import React, { useState } from "react";
import {
  makeStyles, createStyles, Container, Typography,
  Grid, Checkbox, FormControlLabel,
  Link, Button, Avatar
} from '@material-ui/core';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ValidatorForm} from 'react-material-ui-form-validator';
import FormTextField from './controls/FormTextField';

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
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn: React.FC = () => {
    const [profile, setProfile] = useState<Partial<RegisterState>>({email: '', password: ''});  

    const onProfileUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {      
      setProfile({...profile, [event.target.name]: event.target.value});
    }      

    const classes = useStyles();
    return (
        <div>       
          <div className="center">
            <Container component="main" maxWidth="xs">            
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign In
                </Typography>
                <ValidatorForm 
                  className={classes.form}  
                  debounceTime={1000}             
                >
                  <Grid container spacing={2}> 
                    <Grid item xs={12}>
                      <FormTextField 
                        label="Email Address"
                        name="email"
                        value={profile.email}
                        onChange={onProfileUpdate}
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'Email is not valid']}
                      />                   
                    </Grid>
                    <Grid item xs={12}>
                    <FormTextField 
                        label="Password"
                        name="password"
                        type="password" 
                        value={profile.password}                      
                        onChange={onProfileUpdate}                                          
                    />
                    </Grid>                   
                  </Grid>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}                  
                  >
                    Sign In
                  </Button>
                  <Grid container justify="flex-end">                 
                  </Grid>
                </ValidatorForm>
              </div>            
            </Container>
          </div>
        </div>
      );
};

export default SignIn;