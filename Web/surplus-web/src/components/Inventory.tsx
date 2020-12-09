import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Grid, TextField } from "@material-ui/core";
import InventoryService from "../services/Inventory";
import InventoryModel from "../Models/Inventory";

type InventoryState = {
  description: string;
  quantity: string;
  price: string;
};

const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<Partial<InventoryState>>({});
  useEffect(() => {
    const inventoryService = new InventoryService();
    const results = inventoryService.getByLocation().then((response) => {
      //const inventoryModel = response as InventoryModel;
      //setInventory({ ...inventory, description: inventoryModel.Description });
    });
  }, []);
  return (
    <div>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="fname"
            name="description"
            variant="outlined"
            fullWidth
            label="Description"
            value={inventory.description}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="quantity"
            variant="outlined"
            fullWidth
            label="Quantity"
            value={inventory.quantity}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="price"
            variant="outlined"
            fullWidth
            label="price"
            value={inventory.price}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Inventory;
