import React from "react";
import LocationModel from "../models/Location";
import { Grid, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import CallMadeIcon from "@material-ui/icons/CallMade";

interface Props {
  LocationModel: LocationModel | undefined;
}

const VendorLocation: React.FC<Props> = (props) => {
  const vendorId = props.LocationModel && props.LocationModel.VendorModel.Id;
  const locationId = props.LocationModel && props.LocationModel.Id;
  const search = `?VendorId=${vendorId}&LocationId=${locationId}`;

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
        <Grid item xs={6} sm={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="Name"
            value={props.LocationModel && props.LocationModel.Name}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="Address"
            value={props.LocationModel && props.LocationModel.Address}
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <TextField
            variant="outlined"
            fullWidth
            label="Postal Code"
            disabled
            value={props.LocationModel && props.LocationModel.PostalCode}
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <TextField
            variant="outlined"
            fullWidth
            label="Latitude"
            disabled
            value={props.LocationModel && props.LocationModel.Latitude}
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <TextField
            variant="outlined"
            fullWidth
            label="Longitude"
            disabled
            value={props.LocationModel && props.LocationModel.Longitude}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default VendorLocation;
