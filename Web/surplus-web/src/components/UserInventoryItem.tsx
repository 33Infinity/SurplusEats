import React from "react";
import MediaCard from "../controls/MediaCard";
import InventoryModel from "../models/Inventory";
import DefaultImage from "../images/InventoryBlank.png";
import StringUtils from "../utils/StringUtils";

interface Props {
  inventoryItem: (InventoryModel | undefined) | null;
}

const UserInventoryItem: React.FC<Props> = (props) => {
  return (
    <div>
      <MediaCard
        title={"Name Of Inventory Item"}
        text={StringUtils.valueOrDefault(
          props.inventoryItem && props.inventoryItem.Description,
          "No description provided"
        )}
        imageUrl={StringUtils.valueOrDefault(
          props.inventoryItem &&
            props.inventoryItem.LocationModel &&
            props.inventoryItem.LocationModel.VendorModel &&
            props.inventoryItem.LocationModel.VendorModel.ImageUrl,
          DefaultImage
        )}
      />
    </div>
  );
};

export default UserInventoryItem;
