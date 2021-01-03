import React from "react";
import LocationModel from "../models/Location";
import { Grid, TextField } from "@material-ui/core";

interface Props {
  LocationModel: LocationModel | undefined;
}

const VendorLocation: React.FC<Props> = (props) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={5}>
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
