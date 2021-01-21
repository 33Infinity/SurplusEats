import React, { useState } from "react";
import LocationModel from "../models/Location";
import VendorModel from "../models/Vendor";
import ErrorModel from "../models/Error";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { Grid, TextField, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import LocationService from "../services/Location";
import CustomMap from "./CustomMap";
import ArrayUtils from "../utils/ArrayUtils";
import Snackbar from "@material-ui/core/Snackbar";
import { confirmWithTwoButtons } from "./Confirmation";

interface Props {
  locationModel: LocationModel;
  vendorModel: VendorModel;
  onCloseDialog(refreshLocations): any;
  reopenDialog(): any;
  dialogOpen: boolean;
  newLocation: boolean;
}

type LocationState = {
  name: string;
  city: string;
  state: string;
  address: string;
  postalCode: string;
  latitude: number;
  longitude: number;
};

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
  })
);

const VendorLocationDialog: React.FC<Props> = (props) => {
  const CONFIRMATION_BUTTON_TEXT_SAVE = "Save";
  const CONFIRMATION_BUTTON_TEXT_CONFIRM_ADDRESS = "Confirm Address";
  let locationService = new LocationService();
  const classes = useStyles();
  const [location, setLocation] = useState<Partial<LocationState>>({
    name: props.locationModel.Name,
    city: props.locationModel.City,
    state: props.locationModel.State,
    address: props.locationModel.Address,
    postalCode: props.locationModel.PostalCode,
    latitude: props.locationModel.Latitude,
    longitude: props.locationModel.Longitude,
  });
  const [locationsForMap, setLocationsForMap] = useState<
    Partial<LocationModel[]>
  >();
  const [addressConfirmed, setAddressConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const onLocationUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation({
      ...location,
      [event.target.name]: event.target.value,
    });
  };
  async function handleCancel() {
    setAddressConfirmed(false);
    props.onCloseDialog(false);
  }
  async function handleSave() {
    props.onCloseDialog(false);
    if (addressConfirmed) {
      if (locationsForMap && locationsForMap.length > 0 && locationsForMap[0]) {
        locationsForMap[0].VendorModel = props.vendorModel;
        if (props.newLocation) {
          addNewLocation(locationsForMap[0]);
        } else {
          updateLocation(locationsForMap[0]);
        }
      }
      return;
    }
    setErrorMessage("");
    const locationModelToSave = LocationModel.NewLocation(
      props.vendorModel,
      location.name,
      location.city,
      location.state,
      location.latitude,
      location.longitude,
      location.address,
      location.postalCode,
      props.locationModel.Id,
      props.locationModel.CreatedDate
    );
    const response = await locationService.getLatLonFromLocation(
      locationModelToSave
    );
    if (response instanceof ErrorModel) {
      setShowError(true);
      setErrorMessage(response.ErrorMessage);
      setAddressConfirmed(false);
      return;
    }
    locationModelToSave.Latitude = response[0].lat;
    locationModelToSave.Longitude = response[0].lon;
    setLocation({
      ...location,
      latitude: response[0].lat,
      longitude: response[0].lon,
    });
    setLocationsForMap(ArrayUtils.objectToArrary(locationModelToSave));
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
    setAddressConfirmed(true);
    props.reopenDialog();
  }
  function denyAddress() {
    setAddressConfirmed(false);
    resetLocationCoordinates();
    props.reopenDialog();
  }
  function resetLocationCoordinates() {
    setLocation({
      ...location,
      latitude: 0,
      longitude: 0,
    });
  }
  async function addNewLocation(aLocationModel) {
    locationService.addLocation(aLocationModel).then(() => {
      props.onCloseDialog(true);
    });
  }
  async function updateLocation(aLocationModel) {
    locationService.updateLocation(aLocationModel).then(() => {
      props.onCloseDialog(true);
    });
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="name"
                label="My Store Name"
                onChange={onLocationUpdate}
                value={location.name}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="city"
                label="City"
                onChange={onLocationUpdate}
                value={location.city}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="state"
                label="State"
                onChange={onLocationUpdate}
                value={location.state}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="address"
                label="123 N Street"
                onChange={onLocationUpdate}
                value={location.address}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="postalCode"
                label="12345"
                onChange={onLocationUpdate}
                value={location.postalCode}
              />
            </Grid>
            <Grid container justify="flex-end">
              <DialogActions>
                <Button onClick={handleCancel} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                  {addressConfirmed
                    ? CONFIRMATION_BUTTON_TEXT_SAVE
                    : CONFIRMATION_BUTTON_TEXT_CONFIRM_ADDRESS}
                </Button>
              </DialogActions>
            </Grid>
            {locationsForMap != null &&
              location.latitude != null &&
              location.latitude != 0 && (
                <Grid item xs={12} sm={12}>
                  <CustomMap
                    locationModels={locationsForMap}
                    centerLatitude={
                      location.latitude != null ? location.latitude : 0
                    }
                    centerLongitude={
                      location.longitude != null ? location.longitude : 0
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
