import React, { useState } from "react";
import LocationModel from "../../models/Location";
import VendorModel from "../../models/Vendor";
import ErrorModel from "../../models/Error";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { Grid, TextField, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import LocationService from "../../services/Location";
import CustomMap from "../../controls/CustomMap";
import ArrayUtils from "../../utils/ArrayUtils";
import Snackbar from "@material-ui/core/Snackbar";
import { confirmWithTwoButtons } from "../../controls/Confirmation";
import States from "../../data/States";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import StringUtil from "../../utils/StringUtils";

interface Props {
  locationModel: LocationModel;
  vendorModel: VendorModel;
  onCloseDialog(): any;
  setLocation(aColumn, aValue): any;
  dialogOpen: boolean;
  newLocation: boolean;
  addLocation(aLocationModel: LocationModel): any;
  updateLocation(aLocationModel: LocationModel): any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      "& > *": {
        margin: theme.spacing(1),
        width: "100ch",
      },
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    dialogClose: {
      float: "right",
    },
  })
);

const VendorLocationDialog: React.FC<Props> = (props) => {
  const CONFIRMATION_BUTTON_TEXT_SAVE = "Save";
  let locationModelToSave;
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const onLocationUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setLocation(event.target.name, event.target.value);
  };
  function onStateSelected(aValue) {
    props.setLocation("State", aValue.target.value);
  }
  async function handleCancel() {
    props.onCloseDialog();
  }
  async function handleSave() {
    setErrorMessage("");
    locationModelToSave = LocationModel.NewLocation(
      props.vendorModel,
      props.locationModel.Name,
      props.locationModel.City,
      props.locationModel.State,
      props.locationModel.Latitude,
      props.locationModel.Longitude,
      props.locationModel.Address,
      props.locationModel.PostalCode,
      props.locationModel.PhoneArea,
      props.locationModel.PhoneNumber,
      props.locationModel.Id,
      props.locationModel.CreatedDate
    );
    const response = await LocationService.getLatLonFromLocation(
      locationModelToSave
    );
    if (response instanceof ErrorModel) {
      setShowError(true);
      setErrorMessage(response.ErrorMessage);
      return;
    }
    locationModelToSave.Latitude = response[0].lat;
    locationModelToSave.Longitude = response[0].lon;
    props.setLocation("Latitude", response[0].lat);
    props.setLocation("Longitude", response[0].lon);
    setShowError(false);
    await confirmWithTwoButtons(
      "Yes",
      "No",
      "Address Confirmation",
      `Do you confirm ${response[0].display_name} as the address?`,
      confirmAddress,
      denyAddress
    );
  }
  function confirmAddress() {
    if (props.newLocation) {
      props.addLocation(locationModelToSave);
    } else {
      props.updateLocation(locationModelToSave);
    }
  }
  function denyAddress() {
    resetLocationCoordinates();
  }
  function resetLocationCoordinates() {
    props.setLocation("Latitude", 0);
    props.setLocation("Longitude", 0);
  }
  return (
    <>
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
      <Dialog
        maxWidth={"md"}
        open={props.dialogOpen}
        onClose={props.onCloseDialog}
      >
        <div className={classes.root}>
          <div>
            <IconButton
              className={classes.dialogClose}
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={handleCancel}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="Name"
                label="My Store Name"
                onChange={onLocationUpdate}
                value={props.locationModel.Name}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="City"
                label="City"
                onChange={onLocationUpdate}
                value={props.locationModel.City}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              Select a state:{" "}
              <Select
                value={
                  StringUtil.nullOrEmpty(props.locationModel.State)
                    ? "AL"
                    : props.locationModel.State
                }
                onChange={onStateSelected}
              >
                {States.map((item) => (
                  <MenuItem key={item.abbreviation} value={item.abbreviation}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="Address"
                label="Address"
                onChange={onLocationUpdate}
                value={props.locationModel.Address}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="PostalCode"
                label="Postal Code"
                onChange={onLocationUpdate}
                value={props.locationModel.PostalCode}
              />
            </Grid>
            <Grid container item xs={12} sm={12}>
              <Grid item xs={12} sm={3}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="PhoneArea"
                  label="Phone Area"
                  onChange={onLocationUpdate}
                  value={props.locationModel.PhoneArea}
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="PhoneNumber"
                  label="Phone Number"
                  onChange={onLocationUpdate}
                  value={props.locationModel.PhoneNumber}
                />
              </Grid>
            </Grid>
            <Grid container justify="flex-end">
              <DialogActions>
                <Button onClick={handleCancel} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                  {CONFIRMATION_BUTTON_TEXT_SAVE}
                </Button>
              </DialogActions>
            </Grid>
            {props.locationModel.Latitude != null &&
              props.locationModel.Latitude != 0 && (
                <Grid item xs={12} sm={12}>
                  <CustomMap
                    locationModels={ArrayUtils.objectToArray(
                      props.locationModel
                    )}
                    centerLatitude={
                      props.locationModel.Latitude != null
                        ? props.locationModel.Latitude
                        : 0
                    }
                    centerLongitude={
                      props.locationModel.Longitude != null
                        ? props.locationModel.Longitude
                        : 0
                    }
                    zoom={11}
                  />
                </Grid>
              )}
          </Grid>
        </div>
      </Dialog>
    </>
  );
};

export default VendorLocationDialog;
