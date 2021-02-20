import React, { useEffect, useState } from "react";
import HttpHelper from "../utils/HttpHelper";
import InventoryService from "../services/Inventory";
import InventoryModel from "../models/Inventory";
import ErrorModel from "../models/Error";
import { confirmWithSingleButton } from "../controls/Confirmation";

const InventoryDetail: React.FC = () => {
  useEffect(() => {
    getInventory();
  }, []);
  const [inventory, setInventory] = useState<InventoryModel>();
  async function getInventory() {
    const inventoryId = HttpHelper.getUrlParamValue("InventoryId");
    const foundInventory = await InventoryService.getById(inventoryId);
    if (foundInventory instanceof InventoryModel) {
      setInventory(foundInventory);
    }
    if (foundInventory instanceof ErrorModel) {
      confirmWithSingleButton(
        "Ok",
        "Error",
        foundInventory.ErrorMessage,
        navigateBackToSignIn
      );
    }
  }
  function navigateBackToSignIn() {
    window.location.href = "Signin";
  }
  return (
    <div>
      <img src={inventory?.ImageUrl} />
    </div>
  );
};

export default InventoryDetail;
