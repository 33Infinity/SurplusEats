import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
import { signInWithGoogle } from "../firebase/firebase.utils";
import { auth } from "../firebase/firebase.utils";
import BackDrop from "../controls/Backdrop";
import AuthenticationService from "../services/Authentication";
import Error from "../models/Error";
import Profile from "../models/Profile";
import ToastError from "../controls/ToastError";

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
      marginTop: "20px",
    },
  })
);

const SignIn: React.FC = () => {
  const authenticationService = new AuthenticationService();
  const [profile, setProfile] = useState<Partial<RegisterState>>({
    email: "",
    password: "",
  });

  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  let validationForm: ValidatorForm = React.createRef();
  const history = useHistory();

  const onProfileUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const onSignIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();   
    let valid = true;
    validationForm.current.isFormValid(false).then(async (isValid) => {
      if (isValid) {        
        try {
          setLoading(true);
          let signedInProfile = await authenticationService.signIn(
            profile.email,
            profile.password
          );
          if (signedInProfile instanceof Error) {
            const err = signedInProfile as Error;
            setErrorMessage(err.ErrorMessage);
            setLoading(false);
            setShowError(false);
            valid = false;
          } else {
            signedInProfile = signedInProfile as Profile;
            if (signedInProfile.IsAuthenticated) {
              await auth.signInWithEmailAndPassword(
                profile.email!,
                profile.password!
              );
              history.push("home");
            } else {
              setErrorMessage("Unable to authenticate");
              setShowError(true);
              setLoading(false);
              valid = false;
            }
          }
        } catch (error) {
          setErrorMessage(error.message);
          setShowError(true);
          setLoading(false);
          valid = false;
        }
      } else {
        valid = false;
      }
    });    
    return valid;
  };

  const classes = useStyles();
  return (
    <div>
      <BackDrop isLoading={isLoading} />
      <ToastError
        showError={showError}
        setShowError={setShowError}
        errorMessage={errorMessage}
      />
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
              ref={validationForm}
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
                    errorMessages={["this field is required"]}
                  />
                </Grid>
              </Grid>
              <Grid className={classes.submitGrid}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={(event) => {                    
                    onSignIn(event);
                  }}
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
              </Grid>
              <Grid container justify="flex-end"></Grid>
            </ValidatorForm>
            <Link href="register">Register new account</Link>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default SignIn;
