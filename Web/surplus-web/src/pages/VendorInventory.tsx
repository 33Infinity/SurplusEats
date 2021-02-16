import React, { useEffect, useState } from "react";
import { Grid, TextField, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import InventoryService from "../services/Inventory";
import LocationService from "../services/Location";
import InventoryModel from "../models/Inventory";
import LocationModel from "../models/Location";
import SaveIcon from "@material-ui/icons/Save";
import ImageUpload from "../controls/ImageUpload";
import FileService from "../services/File";
import VendorInventoryItem from "../components/vendor/VendorInventoryItem";
import HttpHelper from "../utils/HttpHelper";
import { confirmWithTwoButtons } from "../controls/Confirmation";
import ErrorModel from "../models/Error";
import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      height: "200px",
      width: "200px",
    },
    center: {
      textAlign: "center",
      margin: "auto",
    },
  })
);

type NewInventoryState = {
  name: string;
  description: string;
  price: string;
  quantity: string;
  imageUrl: string;
};

const VendorInventory: React.FC = () => {
  const classes = useStyles();
  const [newInventory, setNewInventory] = useState<Partial<NewInventoryState>>({
    name: "",
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
  const [currentlySelectedFile, setCurrentlySelectedFile] = useState(null);
  function clearNewInventory() {
    setNewInventory({
      ...newInventory,
      description: "",
      price: "",
      quantity: "",
      imageUrl: "",
    });
    setCurrentlySelectedFile(null);
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
      let locationModel =
        response != null && response.length > 0
          ? response[0].LocationModel
          : null;
      if (locationModel != null) {
        setLocationModel(locationModel);
        setInventory(response);
      } else {
        locationModel = await LocationService.getById(locationId);
        if (locationModel instanceof LocationModel) {
          setLocationModel(locationModel);
        }
      }
    }
  }
  async function selectedFileCallBack(aFile) {
    setCurrentlySelectedFile(aFile);
  }
  async function addNewInventory() {
    if (validate()) {
      const imageUrl = await FileService.add(
        currentlySelectedFile,
        HttpHelper.getUrlParamValue("VendorId")
      );
      const inventoryModel = InventoryModel.NewInventory(
        newInventory.name,
        newInventory.description,
        newInventory.price,
        newInventory.quantity,
        imageUrl,
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
    setCurrentlySelectedFile(null);
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
      {inventory &&
        inventory.length > 0 &&
        inventory[0] instanceof InventoryModel && (
          <div className={classes.center}>
            <h1>Inventory</h1>
            <img
              src={inventory[0]?.LocationModel?.VendorModel?.ImageUrl}
              className={classes.image}
            ></img>
            <br></br>
          </div>
        )}
      {inventory &&
        inventory.length > 0 &&
        inventory.map(function (inventoryItem) {
          return (
            <div>
              <VendorInventoryItem
                inventoryModel={inventoryItem}
                updateInventory={updateInventory}
                deleteInventory={deleteInventory}
              />
            </div>
          );
        })}
      {inventory == null ||
        (inventory.length === 0 && <h1>No Inventory Found</h1>)}
      <div>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={1}>
            <ImageUpload
              onSelectedFile={selectedFileCallBack}
              buttonText="Save"
            />
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
      )<Link to="/Home">Back To Locations</Link>
    </div>
  );
};

export default VendorInventory;
