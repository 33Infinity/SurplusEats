import React, { useState } from "react";
import { Grid, TextField, IconButton } from "@material-ui/core";
import DefaultImage from "../../images/InventoryBlank.png";
import InventoryModel from "../../models/Inventory";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";

interface Props {
  inventoryModel: InventoryModel | undefined;
  deleteInventory(anInventoryId: string): any;
  updateInventory(anInventoryModel: InventoryModel): any;
}

type UpdatedInventoryState = {
  name: string;
  description: string;
  price: number;
  quantity: number;
};

const VendorInventoryItem: React.FC<Props> = (props) => {
  const [updatedInventory, setUpdatedInventory] = useState<
    Partial<UpdatedInventoryState>
  >({
    name: props.inventoryModel && props.inventoryModel.Name,
    description: props.inventoryModel && props.inventoryModel.Description,
    price: props.inventoryModel && props.inventoryModel.Price,
    quantity: props.inventoryModel && props.inventoryModel.Quantity,
  });
  const onNewInventoryUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedInventory({
      ...updatedInventory,
      [event.target.name]: event.target.value,
    });
  };
  const [editMode, setEditMode] = useState(false);

  async function updateInventory() {
    if (validate()) {
      disableEditMode();
      const inventoryModel = InventoryModel.NewInventory(
        updatedInventory.name,
        updatedInventory.description,
        updatedInventory.price,
        updatedInventory.quantity,
        props.inventoryModel?.ImageUrl,
        props.inventoryModel?.LocationModel,
        props.inventoryModel?.Id,
        props.inventoryModel?.CreatedDate
      );
      props.updateInventory(inventoryModel);
    } else {
      alert("Validation Failed");
    }
  }
  async function deleteInventory(anInventoryId) {
    props.deleteInventory(anInventoryId);
  }
  function enableEditMode() {
    setEditMode(true);
  }
  function disableEditMode() {
    setEditMode(false);
  }
  function cancelUpdate() {
    disableEditMode();
    setUpdatedInventory({
      ...updatedInventory,
      name: props.inventoryModel && props.inventoryModel.Name,
      description: props.inventoryModel && props.inventoryModel.Description,
      price: props.inventoryModel && props.inventoryModel.Price,
      quantity: props.inventoryModel && props.inventoryModel.Quantity,
    });
  }
  function validate() {
    return true;
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={1}>
          <img
            className="thumbnail"
            src={
              props.inventoryModel && props.inventoryModel.ImageUrl != ""
                ? props.inventoryModel.ImageUrl
                : DefaultImage
            }
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            variant="outlined"
            fullWidth
            name="name"
            label="Name"
            value={updatedInventory.name}
            disabled={!editMode}
            onChange={onNewInventoryUpdate}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            variant="outlined"
            fullWidth
            name="description"
            label="Description"
            value={updatedInventory.description}
            disabled={!editMode}
            onChange={onNewInventoryUpdate}
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <TextField
            variant="outlined"
            fullWidth
            name="quantity"
            label="Quantity"
            value={updatedInventory.quantity}
            disabled={!editMode}
            onChange={onNewInventoryUpdate}
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <TextField
            variant="outlined"
            fullWidth
            name="price"
            label="Price"
            value={updatedInventory.price}
            disabled={!editMode}
            onChange={onNewInventoryUpdate}
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <IconButton onClick={enableEditMode} hidden={editMode}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={cancelUpdate} hidden={!editMode}>
            <BlockIcon />
          </IconButton>
          <IconButton onClick={updateInventory} hidden={!editMode}>
            <SaveIcon />
          </IconButton>
          <IconButton
            disabled={editMode}
            onClick={() =>
              deleteInventory(props.inventoryModel && props.inventoryModel.Id)
            }
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default VendorInventoryItem;
