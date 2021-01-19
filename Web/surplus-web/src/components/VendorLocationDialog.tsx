import React, { useState } from "react";
import LocationModel from "../models/Location";
import VendorModel from "../models/Vendor";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { Grid, TextField } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import LocationService from "../services/Location";
import CustomMap from "./CustomMap";

interface Props {
  locationModel: LocationModel;
  vendorModel: VendorModel;
  onCloseDialog(): any;
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
  })
);

const VendorLocationDialog: React.FC<Props> = (props) => {
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
  const onLocationUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation({
      ...location,
      [event.target.name]: event.target.value,
    });
  };
  async function handleSave() {
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
    locationModelToSave.Latitude = response[0].lat;
    locationModelToSave.Longitude = response[0].lon;
    setLocation({
      ...location,
      latitude: response[0].lat,
      longitude: response[0].lon,
    });
    setLocationsForMap(getLocationModelsArrayForMap());
    /* if (props.newLocation) {
      addNewLocation(locationModelToSave);
    } else {
      updateLocation(locationModelToSave);
    } */
  }
  async function addNewLocation(aLocationModel) {
    locationService.addLocation(aLocationModel).then(() => {
      props.onCloseDialog();
    });
  }
  async function updateLocation(aLocationModel) {
    locationService.updateLocation(aLocationModel).then(() => {
      props.onCloseDialog();
    });
  }
  function getLocationModelsArrayForMap() {
    const locationArr: LocationModel[] = [];
    const locationItem = LocationModel.NewLocation(
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
    locationArr.push(locationItem);
    return locationArr;
  }
  return (
    <>
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
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="city"
                label="City"
                onChange={onLocationUpdate}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="state"
                label="State"
                onChange={onLocationUpdate}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="address"
                label="123 N Street"
                onChange={onLocationUpdate}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="postalCode"
                label="12345"
                onChange={onLocationUpdate}
              />
            </Grid>
            <Grid container justify="flex-end">
              <DialogActions>
                <Button onClick={props.onCloseDialog} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Grid>
            {locationsForMap != null &&
              location.latitude != null &&
              location.latitude != 0 && (
                <Grid item xs={12} sm={12}>
                  <CustomMap
                    locationModels={
                      locationsForMap != null ? locationsForMap : null
                    }
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
