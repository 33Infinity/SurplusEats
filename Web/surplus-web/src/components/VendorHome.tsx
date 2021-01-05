import React, { useEffect, useState } from "react";
import LocationService from "../services/Location";
import LocationModel from "../models/Location";
import VendorModel from "../models/Vendor";
import VendorLocation from "./VendorLocation";
import { Grid, TextField, IconButton } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

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
    locationService = new LocationService();
    locationService.getByVendor(props.VendorId).then((response) => {
      const vendorModel = response != null ? response[0].VendorModel : null;
      setVendorModel(vendorModel);
      setLocations(response);
    });
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
    locationService.addLocation(locationModel).then((response) => {
      console.log(response);
    });
  }
  const onNewLocationUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLocation({
      ...newLocation,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div>
      {locations &&
        locations.length > 0 &&
        locations.map(function (locationModel) {
          return (
            <div>
              <VendorLocation LocationModel={locationModel} />
            </div>
          );
        })}
      <Grid container spacing={2}>
        <Grid item xs={6} sm={4}>
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
