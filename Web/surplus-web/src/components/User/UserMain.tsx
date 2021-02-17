import React from "react";
import LocationModel from "../../models/Location";
import InventoryModel from "../../models/Inventory";
import UserInventoryItem from "./UserInventoryItem";
import UserLocationItem from "./UserLocationItem";

interface Props {
  showInventory: boolean;
  locations: (LocationModel | undefined)[] | null;
  inventory: (InventoryModel | undefined)[] | null;
}

const UserMain: React.FC<Props> = (props) => {
  const getInventory = (
    <div>
      {props.inventory &&
        props.inventory.length > 0 &&
        props.inventory.map(function (inventoryItem) {
          return <UserInventoryItem inventory={inventoryItem} />;
        })}
    </div>
  );
  const getLocations = (
    <div>
      {props.locations &&
        props.locations.length > 0 &&
        props.locations.map(function (locationItem) {
          if (locationItem != null) {
            return <UserLocationItem location={locationItem} />;
          }
        })}
    </div>
  );
  return <>{props.showInventory ? getInventory : getLocations}</>;
};

export default UserMain;
