import React, { useEffect, useState } from "react";
import LocationService from "../services/Location";
import LocationModel from "../models/Location";
import VendorModel from "../models/Vendor";
import VendorLocation from "./VendorLocation";
import { Grid, TextField, IconButton } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { confirmWithTwoButtons } from "./Confirmation";

interface Props {
  VendorId: string;
}

type NewLocationState = {
  name: string;
  address: string;
  postalCode: string;
  latitude: string;
  longitude: string;
};

const VendorHome: React.FC<Props> = (props) => {
  let locationService = new LocationService();
  useEffect(() => {
    getByVendor();
  }, []);
  const [vendorModel, setVendorModel] = useState<Partial<VendorModel | null>>();
  const [locations, setLocations] = useState<Partial<LocationModel[] | null>>(
    []
  );
  const [newLocation, setNewLocation] = useState<Partial<NewLocationState>>({
    name: "",
    address: "",
    postalCode: "",
    latitude: "",
    longitude: "",
  });
  function getByVendor() {
    locationService = new LocationService();
    locationService.getByVendor(props.VendorId).then((response) => {
      const vendorModel = response != null ? response[0].VendorModel : null;
      setVendorModel(vendorModel);
      setLocations(response);
    });
  }
  async function addNewLocation() {
    const locationModel = LocationModel.NewLocation(
      vendorModel,
      newLocation.name,
      newLocation.latitude,
      newLocation.longitude,
      newLocation.address,
      newLocation.postalCode,
      null,
      null
    );
    locationService.addLocation(locationModel).then(() => {
      getByVendor();
    });
  }
  const onNewLocationUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLocation({
      ...newLocation,
      [event.target.name]: event.target.value,
    });
  };
  async function updateLocation(aLocationModel) {
    locationService.updateLocation(aLocationModel).then(() => {
      getByVendor();
    });
  }
  async function deleteLocation(aLocationId) {
    confirmWithTwoButtons(
      "Yes",
      "No",
      "Delete Confirmation",
      "Are you sure you want to delete this location?",
      () => processDeleteConfirmation(aLocationId),
      null
    );
  }
  async function processDeleteConfirmation(aLocationId) {
    locationService.deleteLocation(aLocationId).then(() => {
      getByVendor();
    });
  }
  return (
    <div>
      <img src={vendorModel?.ImageUrl}></img>
      {locations &&
        locations.length > 0 &&
        locations.map(function (locationModel) {
          return (
            <div>
              <VendorLocation
                LocationModel={locationModel}
                updateLocation={updateLocation}
                deleteLocation={deleteLocation}
              />
            </div>
          );
        })}
      <Grid container spacing={2}>
        <Grid item xs={6} sm={1}></Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            variant="outlined"
            fullWidth
            name="name"
            label="Name"
            onChange={onNewLocationUpdate}
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <TextField
            variant="outlined"
            fullWidth
            label="Latitude"
            onChange={onNewLocationUpdate}
            name="latitude"
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <TextField
            variant="outlined"
            fullWidth
            label="Longitude"
            onChange={onNewLocationUpdate}
            name="longitude"
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="Address"
            onChange={onNewLocationUpdate}
            name="address"
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <TextField
            variant="outlined"
            fullWidth
            label="Postal Code"
            onChange={onNewLocationUpdate}
            name="postalCode"
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <IconButton onClick={() => addNewLocation()}>
            <SaveIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default VendorHome;
