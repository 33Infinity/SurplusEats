import React from "react";
import LocationModel from "../models/Location";
import { Grid, TextField, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import CallMadeIcon from "@material-ui/icons/CallMade";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

interface Props {
  location: LocationModel | undefined;
  deleteLocation(aLocationId: string): any;
  handleOpenNewLocationDialog(): any;
}

const VendorLocation: React.FC<Props> = (props) => {
  const vendorId = props.location && props.location.VendorModel.Id;
  const locationId = props.location && props.location.Id;
  const search = `?VendorId=${vendorId}&LocationId=${locationId}`;
  async function deleteLocation(anInventoryId) {
    props.deleteLocation(anInventoryId);
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
            value={props.location?.Name}
            disabled
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            variant="outlined"
            fullWidth
            name="address"
            label="Address"
            value={props.location?.Address}
            disabled
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <TextField
            variant="outlined"
            fullWidth
            name="postalCode"
            label="Postal Code"
            value={props.location?.PostalCode}
            disabled
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <TextField
            variant="outlined"
            fullWidth
            name="latitude"
            label="Latitude"
            value={props.location?.Latitude}
            disabled
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <TextField
            variant="outlined"
            fullWidth
            name="longitude"
            label="Longitude"
            value={props.location?.Longitude}
            disabled
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <IconButton onClick={props.handleOpenNewLocationDialog}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => deleteLocation(props.location && props.location.Id)}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default VendorLocation;
