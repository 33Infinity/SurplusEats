import React from "react";
import MediaCard from "../../controls/MediaCard";
import InventoryModel from "../../models/Inventory";
import DefaultImage from "../../images/InventoryBlank.png";
import StringUtils from "../../utils/StringUtils";

interface Props {
  inventoryItem: (InventoryModel | undefined) | null;
}

const UserInventoryItem: React.FC<Props> = (props) => {
  return (
    <div>
      <MediaCard
        title={StringUtils.valueOrDefault(props.inventoryItem?.Name, "")}
        text={StringUtils.valueOrDefault(
          props.inventoryItem && props.inventoryItem.Description,
          "No description provided"
        )}
        imageUrl={StringUtils.valueOrDefault(
          props.inventoryItem?.ImageUrl,
          DefaultImage
        )}
      />
    </div>
  );
};

export default UserInventoryItem;
