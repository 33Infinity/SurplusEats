import React from "react";
import { Grid, TextField } from "@material-ui/core";
import LocationModel from "../models/Location";

interface Props {
  locationItem: LocationModel | undefined;
}

const UserLocationItem: React.FC<Props> = (props) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={1}>
          <img
            src={
              props.locationItem &&
              props.locationItem.VendorModel &&
              props.locationItem.VendorModel.ImageUrl
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="Name"
            value={props.locationItem && props.locationItem.Name}
          />
        </Grid>
        <Grid item xs={12} sm={7}>
          <TextField
            variant="outlined"
            fullWidth
            label="Description"
            value={
              props.locationItem &&
              props.locationItem.VendorModel &&
              props.locationItem.VendorModel.Description
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default UserLocationItem;
