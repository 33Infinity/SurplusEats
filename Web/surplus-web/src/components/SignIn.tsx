import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import {
  makeStyles,
  createStyles,
  Container,
  Typography,
  Grid,   
  Button,
  Avatar,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ValidatorForm } from "react-material-ui-form-validator";
import FormTextField from "../controls/FormTextField";
import { signInWithGoogle } from '../firebase/firebase.utils';
import { auth } from '../firebase/firebase.utils';
import Header from "./Header";
import Snackbar from '@material-ui/core/Snackbar';

type RegisterState = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

const useStyles = makeStyles((theme) =>
  createStyles({
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
      margin: theme.spacing(1, 0, 0),
    },
    submitGrid: {
      marginTop: "20px"
    }
  })
);

const SignIn: React.FC = () => {
  const [profile, setProfile] = useState<Partial<RegisterState>>({
    email: "",
    password: "",
  });

  let validationForm: ValidatorForm = React.createRef();
  const history = useHistory();

  const onProfileUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const onSignIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();   

    validationForm.current.isFormValid(false).then((isValid) => {     
      return false;
    });

    try {
        await auth.signInWithEmailAndPassword(profile.email!, profile.password!);        
        history.push("/#/home"); 
    } catch(error) {
        console.log(error);
    }
  }

  const classes = useStyles();
  return (
    <div>
      <Header />
      <div className="center">
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <ValidatorForm ref={validationForm} className={classes.form} debounceTime={1000}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormTextField
                    label="Email Address"
                    name="email"
                    value={profile.email}
                    onChange={onProfileUpdate}
                    validators={["required", "isEmail"]}
                    errorMessages={[
                      "this field is required",
                      "Email is not valid",
                    ]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    label="Password"
                    name="password"
                    type="password"
                    validators={["required"]}
                    value={profile.password}
                    onChange={onProfileUpdate}
                    errorMessages={[
                      "this field is required"                      
                    ]}
                  />
                </Grid>
              </Grid>
              <Grid className={classes.submitGrid}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(event) => onSignIn(event)}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={signInWithGoogle}
              >
                Sign In with Google
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => auth.signOut()}
              >
                Sign Out
              </Button>
              </Grid>
              <Grid container justify="flex-end"></Grid>
            </ValidatorForm>
            <Link href="#/register">Register new account</Link>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default SignIn;
