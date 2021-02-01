import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, TextField, Button } from "@material-ui/core";
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
);

type Redux = {
  currentUser: ProfileModel;
};

const VendorProfile: React.FC<Redux> = ({ currentUser }) => {
  let vendorService = new VendorService();
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
    const response = await vendorService.getByEmail(currentUser?.Email);
    if (response instanceof ErrorModel) {
      setError(response);
      return;
    }
    setVendor(response);
  }
  async function updateProfile() {
    const response = await vendorService.update(vendor);
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
      <div className={classes.root}>
        <Grid container spacing={3}>
          <h1>Profile Page</h1>
          <Grid item xs={6} sm={3}>
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
          <Grid item xs={6} sm={3}>
            <ImageUpload onSelectedFile={setImageUrl} />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              variant="outlined"
              fullWidth
              name="Name"
              label="Name"
              value={vendor?.Name}
              onChange={onVendorUpdate}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              variant="outlined"
              fullWidth
              name="Description"
              label="Description"
              value={vendor?.Description}
              onChange={onVendorUpdate}
            />
          </Grid>
          <Button
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={updateProfile}
            disabled={saveProfile}
          >
            Save Profile
          </Button>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(VendorProfile);
