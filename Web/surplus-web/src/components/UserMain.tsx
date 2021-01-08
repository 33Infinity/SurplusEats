import React from "react";
import { Grid, TextField } from "@material-ui/core";
import LocationModel from "../models/Location";
import InventoryModel from "../models/Inventory";

interface Props {
  showInventory: boolean;
  locations: (LocationModel | undefined)[] | null;
  inventory: (InventoryModel | undefined)[] | null;
}

const UserMain: React.FC<Props> = (props) => {
  const getInventory = (
    <div>
      {props.inventory &&
        props.inventory.length > 0 &&
        props.inventory.map(function (inventoryItem) {
          return (
            <div>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Description"
                    value={inventoryItem && inventoryItem.Description}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Quantity"
                    value={inventoryItem && inventoryItem.Quantity}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="price"
                    value={inventoryItem && inventoryItem.Price}
                  />
                </Grid>
              </Grid>
            </div>
          );
        })}
      <div>No Results</div>
    </div>
  );
  const getLocations = <div>Test</div>;
  return <>{props.showInventory ? getInventory : getLocations}</>;
};

export default UserMain;
