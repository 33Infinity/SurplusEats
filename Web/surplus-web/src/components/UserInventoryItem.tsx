import React from "react";
import { Grid, TextField } from "@material-ui/core";
import InventoryModel from "../models/Inventory";

interface Props {
  inventoryItem: (InventoryModel | undefined) | null;
}

const UserInventoryItem: React.FC<Props> = (props) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="Description"
            value={props.inventoryItem && props.inventoryItem.Description}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="Quantity"
            value={props.inventoryItem && props.inventoryItem.Quantity}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="price"
            value={props.inventoryItem && props.inventoryItem.Price}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default UserInventoryItem;
