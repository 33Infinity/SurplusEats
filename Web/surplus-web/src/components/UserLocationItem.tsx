import React from "react";
import DefaultImage from "../images/InventoryBlank.png";
import LocationModel from "../models/Location";
import MediaCard from "../controls/MediaCard";
import StringUtils from "../utils/StringUtils";

interface Props {
  locationItem: LocationModel | undefined;
}

const UserLocationItem: React.FC<Props> = (props) => {
  return (
    <div style={{ padding: 10 }}>
      <MediaCard
        title={props.locationItem && props.locationItem.Name}
        text={
          props.locationItem &&
          props.locationItem.VendorModel &&
          props.locationItem.VendorModel.Description
        }
        imageUrl={StringUtils.valueOrDefault(
          props.locationItem &&
            props.locationItem.VendorModel &&
            props.locationItem.VendorModel.ImageUrl &&
            props.locationItem.VendorModel.ImageUrl,
          DefaultImage
        )}
      />
    </div>
  );
};

export default UserLocationItem;
