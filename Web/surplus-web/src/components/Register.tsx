import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  createStyles,
  Container,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Button,
  Avatar,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ValidatorForm } from "react-material-ui-form-validator";
import FormTextField from "../controls/FormTextField";
import { auth } from "../firebase/firebase.utils";
import Snackbar from "@material-ui/core/Snackbar";
import ProfileModel from "../models/Profile";
import AuthenticationService from "../services/Authentication";

type RegisterState = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  isVendor: boolean;
  vendorName: string;
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
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
  })
);

const Register: React.FC = () => {
  const authenticationService = new AuthenticationService();
  const [profile, setProfile] = useState<Partial<RegisterState>>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    isVendor: false,
    vendorName: "",
  });

  ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
    if (value !== profile.password) {
      return false;
    }
    return true;
  });

  let validationForm: ValidatorForm = React.createRef();
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const onProfileUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setProfile({ ...profile, [event.target.name]: value });
  };

  const onSignUp = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    validationForm.current.isFormValid(false).then(async (isValid) => {
      if (isValid) {
        try {
          let newProfile = ProfileModel.NewProfile(
            profile.email,
            profile.password,
            profile.firstName,
            profile.lastName,
            profile.isVendor,
            null,
            new Date(),
            false
          );
          newProfile = await authenticationService.register(newProfile);
          if (newProfile.IsAuthenticated) {
            await auth.createUserWithEmailAndPassword(
              profile.email!,
              profile.password!
            );
            history.push("home");
          }
        } catch (error) {
          setErrorMessage(error.message);
          setShowError(true);
        }
      } else {
        return false;
      }
    });
  };

  const classes = useStyles();
  return (
    <div>     
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        ContentProps={{
          classes: {
            root: classes.error,
          },
        }}
        open={showError}
        onClose={() => setShowError(false)}
        message={errorMessage}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setShowError(false)}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
      <div className="center">
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register Account
            </Typography>
            <ValidatorForm
              ref={validationForm}
              className={classes.form}
              debounceTime={1000}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    label="First Name"
                    name="firstName"
                    value={profile.firstName}
                    onChange={onProfileUpdate}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    label="Last Name"
                    name="lastName"
                    value={profile.lastName}
                    onChange={onProfileUpdate}
                    errorMessages={["this field is required"]}
                    validators={["required"]}
                  />
                </Grid>
                {profile.isVendor && (
                  <Grid item xs={12}>
                    <FormTextField
                      label="Vendor Name"
                      name="vendorName"
                      value={profile.vendorName}
                      onChange={onProfileUpdate}
                    />
                  </Grid>
                )}
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
                    value={profile.password}
                    onChange={onProfileUpdate}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={profile.confirmPassword}
                    onChange={onProfileUpdate}
                    validators={["isPasswordMatch", "required"]}
                    errorMessages={[
                      "password mismatch",
                      "this field is required",
                    ]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={profile.isVendor}
                        name="isVendor"
                        onChange={(event) => {
                          profile.vendorName = "";
                          onProfileUpdate(event);
                        }}
                        color="primary"
                      />
                    }
                    label="Vendor Account"
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(event) => onSignUp(event)}
              >
                Register
              </Button>
              <Grid container justify="flex-end"></Grid>
            </ValidatorForm>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Register;
