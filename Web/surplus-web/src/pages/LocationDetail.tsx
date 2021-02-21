import React, { useEffect, useState } from "react";
import HttpHelper from "../utils/HttpHelper";
import InventoryModel from "../models/Inventory";
import ErrorModel from "../models/Error";
import InventoryService from "../services/Inventory";
import { confirmWithSingleButton } from "../controls/Confirmation";
import UserInventoryItem from "../components/user/UserInventoryItem";

const LocationDetail: React.FC = () => {
  useEffect(() => {
    getInventory();
  }, []);
  const [inventory, setInventory] = useState<InventoryModel[]>([]);
  async function getInventory() {
    const locationId = HttpHelper.getUrlParamValue("LocationId");
    const vendorId = HttpHelper.getUrlParamValue("VendorId");
    const inventoryFromLocation = await InventoryService.getByVendorLocation(
      vendorId,
      locationId
    );
    if (inventoryFromLocation instanceof ErrorModel) {
      confirmWithSingleButton(
        "Ok",
        "Error",
        inventoryFromLocation.ErrorMessage,
        navigateBackToSignIn
      );
    } else {
      setInventory(inventoryFromLocation);
    }
  }
  function navigateBackToSignIn() {
    window.location.href = "Signin";
  }
  return (
    <div>
      {inventory.map((inventoryItem) => {
        return <UserInventoryItem inventory={inventoryItem} />;
      })}
      <a href="Signin">Back</a>
    </div>
  );
};

export default LocationDetail;
