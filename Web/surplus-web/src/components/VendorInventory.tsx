import React, { useEffect, useState } from "react";
import { Grid, TextField, IconButton } from "@material-ui/core";
import InventoryService from "../services/Inventory";
import InventoryModel from "../models/Inventory";
import LocationModel from "../models/Location";
import SaveIcon from "@material-ui/icons/Save";
import ImageUpload from "./ImageUpload";
import firebase from "../firebase/firebase.utils";
import VendorInventoryItem from "./VendorInventoryItem";

type NewInventoryState = {
  description: string;
  price: string;
  quantity: string;
  imageUrl: string;
};

interface Props {
  VendorId: string;
  LocationId: string;
}

const VendorInventory: React.FC<Props> = (props) => {
  let inventoryService = new InventoryService();
  const [newInventory, setNewInventory] = useState<Partial<NewInventoryState>>({
    description: "",
    price: "",
    quantity: "",
    imageUrl: "",
  });
  const [locationModel, setLocationModel] = useState<
    Partial<LocationModel | null>
  >();
  const onNewInventoryUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewInventory({
      ...newInventory,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    inventoryService = new InventoryService();
    inventoryService
      .getByVendorLocation(props.VendorId, props.LocationId)
      .then((response) => {
        const locationModel =
          response != null ? response[0].LocationModel : null;
        setLocationModel(locationModel);
        setInventory(response);
      });
  }, []);
  const [inventory, setInventory] = useState<Partial<InventoryModel[] | null>>(
    []
  );
  async function addFile(aFile) {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(aFile.name);
    await fileRef.put(aFile);
    const fileUrl = await fileRef.getDownloadURL();
    setNewInventory({
      ...newInventory,
      imageUrl: fileUrl,
    });
  }
  async function addNewInventory() {
    if (validate()) {
      const inventoryModel = InventoryModel.NewInventory(
        newInventory.description,
        newInventory.price,
        newInventory.quantity,
        newInventory.imageUrl,
        locationModel,
        null,
        null
      );
      inventoryService.addInventory(inventoryModel).then((response) => {
        console.log(response);
      });
    } else {
      alert("Validation Failed");
    }
  }
  function validate() {
    return true;
  }

  return (
    <div>
      {inventory &&
        inventory.length > 0 &&
        inventory.map(function (inventoryItem) {
          return (
            <div>
              <VendorInventoryItem InventoryModel={inventoryItem} />
            </div>
          );
        })}
      <div>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={1}>
            <ImageUpload onSelectedFile={addFile} />
          </Grid>
          <Grid item xs={6} sm={8}>
            <TextField
              variant="outlined"
              fullWidth
              name="description"
              label="Description"
              onChange={onNewInventoryUpdate}
            />
          </Grid>
          <Grid item xs={6} sm={1}>
            <TextField
              variant="outlined"
              fullWidth
              label="Quantity"
              onChange={onNewInventoryUpdate}
              name="quantity"
            />
          </Grid>
          <Grid item xs={6} sm={1}>
            <TextField
              variant="outlined"
              fullWidth
              label="Price"
              onChange={onNewInventoryUpdate}
              name="price"
            />
          </Grid>
          <Grid item xs={6} sm={1}>
            <IconButton onClick={() => addNewInventory()}>
              <SaveIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default VendorInventory;
