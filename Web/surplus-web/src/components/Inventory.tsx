import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import InventoryService from "../services/Inventory";
import InventoryModel from "../Models/Inventory";

const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<Partial<InventoryModel[] | null>>(
    []
  );
  useEffect(() => {
    const inventoryService = new InventoryService();
    inventoryService.getByLocation().then((response) => {
      setInventory(response);
    });
  }, []);
  return (
    <div>
      {inventory &&
        inventory.length > 0 &&
        inventory.map(function (inventoryItem) {
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
};

export default Inventory;
