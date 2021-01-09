import React, { useState } from "react";
import LocationModel from "../models/Location";
import { Grid, TextField, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import CallMadeIcon from "@material-ui/icons/CallMade";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";

interface Props {
  LocationModel: LocationModel | undefined;
  deleteLocation(aLocationId: string): any;
  updateLocation(aLocationModel: LocationModel): any;
}

type UpdatedLocationState = {
  name: string;
  address: string;
  postalCode: string;
  latitude: number;
  longitude: number;
};

const VendorLocation: React.FC<Props> = (props) => {
  const [updatedLocation, setUpdatedLocation] = useState<
    Partial<UpdatedLocationState>
  >({
    name: props.LocationModel && props.LocationModel.Name,
    address: props.LocationModel && props.LocationModel.Address,
    postalCode: props.LocationModel && props.LocationModel.PostalCode,
    latitude: props.LocationModel && props.LocationModel.Latitude,
    longitude: props.LocationModel && props.LocationModel.Longitude,
  });
  const vendorId = props.LocationModel && props.LocationModel.VendorModel.Id;
  const locationId = props.LocationModel && props.LocationModel.Id;
  const search = `?VendorId=${vendorId}&LocationId=${locationId}`;
  const onNewLocationUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedLocation({
      ...updatedLocation,
      [event.target.name]: event.target.value,
    });
  };
  const [editMode, setEditMode] = useState(false);

  async function updateLocation() {
    if (validate()) {
      disableEditMode();
      const locationModel = LocationModel.NewLocation(
        props.LocationModel?.VendorModel,
        updatedLocation.name,
        updatedLocation.latitude,
        updatedLocation.longitude,
        updatedLocation.address,
        updatedLocation.postalCode,
        props.LocationModel?.Id,
        props.LocationModel?.CreatedDate
      );
      props.updateLocation(locationModel);
    } else {
      alert("Validation Failed");
    }
  }
  async function deleteLocation(anInventoryId) {
    props.deleteLocation(anInventoryId);
  }
  function enableEditMode() {
    setEditMode(true);
  }
  function disableEditMode() {
    setEditMode(false);
  }
  function cancelUpdate() {
    disableEditMode();
    setUpdatedLocation({
      ...updatedLocation,
      name: props.LocationModel && props.LocationModel.Name,
      address: props.LocationModel && props.LocationModel.Address,
      postalCode: props.LocationModel && props.LocationModel.PostalCode,
      latitude: props.LocationModel && props.LocationModel.Latitude,
      longitude: props.LocationModel && props.LocationModel.Longitude,
    });
  }
  function validate() {
    return true;
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={1}>
          <Link
            to={{
              pathname: "/VendorInventory",
              search: search,
            }}
          >
            <CallMadeIcon />
          </Link>
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            variant="outlined"
            fullWidth
            name="name"
            label="Name"
            value={updatedLocation.name}
            disabled={!editMode}
            onChange={onNewLocationUpdate}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            variant="outlined"
            fullWidth
            name="address"
            label="Address"
            value={updatedLocation.address}
            disabled={!editMode}
            onChange={onNewLocationUpdate}
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <TextField
            variant="outlined"
            fullWidth
            name="postalCode"
            label="Postal Code"
            value={updatedLocation.postalCode}
            disabled={!editMode}
            onChange={onNewLocationUpdate}
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <TextField
            variant="outlined"
            fullWidth
            name="latitude"
            label="Latitude"
            value={updatedLocation.latitude}
            disabled={!editMode}
            onChange={onNewLocationUpdate}
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <TextField
            variant="outlined"
            fullWidth
            name="longitude"
            label="Longitude"
            value={updatedLocation.longitude}
            disabled={!editMode}
            onChange={onNewLocationUpdate}
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <IconButton onClick={enableEditMode} hidden={editMode}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={cancelUpdate} hidden={!editMode}>
            <BlockIcon />
          </IconButton>
          <IconButton onClick={updateLocation} hidden={!editMode}>
            <SaveIcon />
          </IconButton>
          <IconButton
            disabled={editMode}
            onClick={() =>
              deleteLocation(props.LocationModel && props.LocationModel.Id)
            }
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default VendorLocation;
