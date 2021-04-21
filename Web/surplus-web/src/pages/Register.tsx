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
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ValidatorForm } from "react-material-ui-form-validator";
import FormTextField from "../controls/FormTextField";
import { auth } from "../utils/Firebase";
import ToastError from "../controls/ToastError";
import ProfileModel from "../models/Profile";
import VendorModel from "../models/Vendor";
import ErrorModel from "../models/Error";
import AuthenticationService from "../services/Authentication";

type RegisterState = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  isVendor: boolean;
  vendorName: string;
  inventoryIds: string[];
  creditCardNumber: string;
  creditCardMonth: string;
  creditCardYear: string;
  creditCardName: string;
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
  })
);

const Register: React.FC = () => {
  const [profile, setProfile] = useState<Partial<RegisterState>>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    isVendor: false,
    vendorName: "",
    inventoryIds: [],
    creditCardNumber: "",
    creditCardMonth: "",
    creditCardYear: "",
    creditCardName: "",
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
            false,
            profile.inventoryIds,
            profile.creditCardNumber,
            profile.creditCardMonth,
            profile.creditCardYear,
            profile.creditCardName
          );
          let newVendor;
          if (profile.isVendor) {
            newVendor = VendorModel.NewVendor(
              profile.email,
              profile.vendorName,
              null,
              null,
              [],
              null,
              new Date()
            );
          }

          const registeredProfile = await AuthenticationService.register(
            newProfile,
            newVendor
          );
          if (registeredProfile instanceof ErrorModel) {
            const err = registeredProfile as ErrorModel;
            setErrorMessage(err.ErrorMessage);
            setShowError(true);
          } else {
            if (registeredProfile.IsAuthenticated) {
              await auth.createUserWithEmailAndPassword(
                profile.email!,
                profile.password!
              );
              history.push("home");
            } else {
              setErrorMessage("Unable to register");
              setShowError(true);
            }
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
