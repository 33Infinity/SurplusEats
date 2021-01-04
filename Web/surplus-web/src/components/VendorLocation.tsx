import React from "react";
import LocationModel from "../models/Location";
import { Grid, TextField, IconButton } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import { Link } from "react-router-dom";

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
            <img
              src={
                props.LocationModel && props.LocationModel.VendorModel.ImageUrl
              }
            ></img>
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
        <Grid item xs={6} sm={6}>
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
      </Grid>
    </div>
  );
};

export default VendorLocation;
