import React, { useEffect, useState } from "react";
import { Grid, TextField, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import InventoryService from "../../services/Inventory";
import InventoryModel from "../../models/Inventory";
import LocationModel from "../../models/Location";
import SaveIcon from "@material-ui/icons/Save";
import ImageUpload from "../../controls/ImageUpload";
import firebase from "../../firebase/firebase.utils";
import VendorInventoryItem from "./VendorInventoryItem";
import HttpHelper from "../../utils/HttpHelper";
import Header from "../Header";
import { confirmWithTwoButtons } from "../../controls/Confirmation";
import ErrorModel from "../../models/Error";

type NewInventoryState = {
  description: string;
  price: string;
  quantity: string;
  imageUrl: string;
};

const VendorInventory: React.FC = () => {
  const [newInventory, setNewInventory] = useState<Partial<NewInventoryState>>({
    description: "",
    price: "",
    quantity: "",
    imageUrl: "",
  });
  const [locationModel, setLocationModel] = useState<Partial<LocationModel>>();
  const onNewInventoryUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewInventory({
      ...newInventory,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    getByVendorLocation();
  }, []);
  const [inventory, setInventory] = useState<Partial<InventoryModel[] | null>>(
    []
  );

  function clearNewInventory() {
    setNewInventory({
      ...newInventory,
      description: "",
      price: "",
      quantity: "",
      imageUrl: "",
    });
  }
  async function getByVendorLocation() {
    const vendorId = HttpHelper.getUrlParamValue("VendorId");
    const locationId = HttpHelper.getUrlParamValue("LocationId");
    const response = await InventoryService.getByVendorLocation(
      vendorId,
      locationId
    );
    if (response instanceof ErrorModel) {
      alert("Error Occurred");
      // TODO: Handle this appropriately
    } else {
      const locationModel =
        response != null && response.length > 0
          ? response[0].LocationModel
          : null;
      if (locationModel != null) {
        setLocationModel(locationModel);
        setInventory(response);
      }
    }
  }
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
      await InventoryService.add(inventoryModel);
      getByVendorLocation();
      clearNewInventory();
    } else {
      alert("Validation Failed");
    }
  }
  async function updateInventory(anInventoryModel) {
    await InventoryService.update(anInventoryModel);
    getByVendorLocation();
  }
  async function deleteInventory(anInventoryId) {
    confirmWithTwoButtons(
      "Yes",
      "No",
      "Delete Confirmation",
      "Are you sure you want to delete this inventory item?",
      () => processDeleteConfirmation(anInventoryId),
      null
    );
  }
  async function processDeleteConfirmation(anInventoryId) {
    await InventoryService.delete(anInventoryId);
    getByVendorLocation();
  }
  function validate() {
    return true;
  }

  return (
    <div>
      <Header />
      {inventory &&
        inventory.length > 0 &&
        inventory.map(function (inventoryItem) {
          return (
            <div>
              <VendorInventoryItem
                InventoryModel={inventoryItem}
                updateInventory={updateInventory}
                deleteInventory={deleteInventory}
              />
            </div>
          );
        })}
      <div>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={1}>
            <ImageUpload onSelectedFile={addFile} buttonText="Save" />
          </Grid>
          <Grid item xs={6} sm={8}>
            <TextField
              variant="outlined"
              fullWidth
              name="description"
              label="Description"
              onChange={onNewInventoryUpdate}
              value={newInventory.description}
            />
          </Grid>
          <Grid item xs={6} sm={1}>
            <TextField
              variant="outlined"
              fullWidth
              label="Quantity"
              onChange={onNewInventoryUpdate}
              name="quantity"
              value={newInventory.quantity}
            />
          </Grid>
          <Grid item xs={6} sm={1}>
            <TextField
              variant="outlined"
              fullWidth
              label="Price"
              onChange={onNewInventoryUpdate}
              name="price"
              value={newInventory.price}
            />
          </Grid>
          <Grid item xs={6} sm={1}>
            <IconButton onClick={() => addNewInventory()}>
              <SaveIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
      <Link to="/Home">Back To Locations</Link>
    </div>
  );
};

export default VendorInventory;
