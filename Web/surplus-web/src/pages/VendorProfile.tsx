import React, { useEffect, useState } from "react";
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
  Theme,
} from "@material-ui/core";
import { connect } from "react-redux";
import ProfileModel from "../models/Profile";
import VendorModel from "../models/Vendor";
import ErrorModel from "../models/Error";
import StringUtil from "../utils/StringUtils";
import VendorService from "../services/Vendor";
import DefaultImage from "../images/InventoryBlank.png";
import ImageUpload from "../controls/ImageUpload";
import { confirmWithSingleButton } from "../controls/Confirmation";
import Error from "../components/Error";
import { ValidatorForm } from "react-material-ui-form-validator";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(3),
    },
  })
);

type Redux = {
  currentUser: ProfileModel;
};

const VendorProfile: React.FC<Redux> = ({ currentUser }) => {
  let validationForm: ValidatorForm = React.createRef();
  useEffect(() => {
    getByEmail();
  }, []);
  const classes = useStyles();
  const [vendor, setVendor] = useState<Partial<VendorModel>>();
  const [error, setError] = useState<ErrorModel | null>(null);
  const [saveProfile, setSaveProfile] = useState(false);
  const onVendorUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSaveProfile(false);
    setVendor({
      ...vendor,
      [event.target.name]: event.target.value,
    });
  };
  function setImageUrl(anImageUrl) {
    setSaveProfile(false);
    setVendor({
      ...vendor,
      ["ImageUrl"]: anImageUrl,
    });
  }
  async function getByEmail() {
    const response = await VendorService.getByEmail(currentUser?.Email);
    if (response instanceof ErrorModel) {
      setError(response);
      return;
    }
    setVendor(response);
  }
  async function updateProfile() {
    const response = await VendorService.update(vendor);
    if (response instanceof VendorModel) {
      setVendor(response);
      setSaveProfile(true);
    } else {
      confirmWithSingleButton(
        "Ok",
        "Failed To Update",
        response.ErrorMessage,
        null
      );
    }
  }

  if (error != null) {
    return <Error redirectUrl={""} error={error} />;
  }
  return (
    <div>
      <div className="center">
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Edit Profile
            </Typography>
            <ValidatorForm
              ref={validationForm}
              className={classes.form}
              debounceTime={1000}
            ></ValidatorForm>
          </div>
        </Container>
        {/* <h1>Profile Page</h1>
        <Grid container justify-xs-center spacing={2} direction={"column"}>
          <Grid item xs={12} sm={2}>
            <img
              src={
                vendor instanceof VendorModel
                  ? StringUtil.nullOrEmpty(vendor?.ImageUrl)
                    ? DefaultImage
                    : vendor.ImageUrl
                  : DefaultImage
              }
            ></img>
          </Grid>
          <Grid item xs={12} sm={2}>
            <ImageUpload
              onSelectedFile={setImageUrl}
              buttonText="Edit Vendor Profile Image"
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              variant="outlined"
              fullWidth
              name="Name"
              label="Name"
              value={vendor?.Name != null ? vendor.Name : ""}
              onChange={onVendorUpdate}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              variant="outlined"
              fullWidth
              name="Description"
              label="Description"
              value={vendor?.Description != null ? vendor.Description : ""}
              onChange={onVendorUpdate}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={updateProfile}
          disabled={saveProfile}
        >
          Save Profile
        </Button> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(VendorProfile);
