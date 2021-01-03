import React from "react";
import { Grid, TextField, IconButton } from "@material-ui/core";
import DefaultImage from "../images/InventoryBlank.png";
import InventoryModel from "../models/Inventory";
import EditIcon from "@material-ui/icons/Edit";

interface Props {
  InventoryModel: InventoryModel | undefined;
}

const VendorInventoryItem: React.FC<Props> = (props) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={1}>
          <img
            className="thumbnail"
            src={
              props.InventoryModel && props.InventoryModel.ImageUrl != ""
                ? props.InventoryModel.ImageUrl
                : DefaultImage
            }
          />
        </Grid>
        <Grid item xs={6} sm={8}>
          <TextField
            variant="outlined"
            fullWidth
            label="Description"
            value={props.InventoryModel && props.InventoryModel.Description}
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <TextField
            variant="outlined"
            fullWidth
            label="Quantity"
            value={props.InventoryModel && props.InventoryModel.Quantity}
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <TextField
            variant="outlined"
            fullWidth
            label="Price"
            disabled
            value={props.InventoryModel && props.InventoryModel.Price}
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default VendorInventoryItem;
