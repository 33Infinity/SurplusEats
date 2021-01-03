import React, { useEffect, useState } from "react";
import LocationService from "../services/Location";
import LocationModel from "../models/Location";
import VendorLocation from "./VendorLocation";

interface Props {
  VendorId: string;
}

const VendorHome: React.FC<Props> = (props) => {
  let locationService = new LocationService();
  useEffect(() => {
    locationService = new LocationService();
    locationService.getByVendor(props.VendorId).then((response) => {
      setLocations(response);
    });
  }, []);
  const [locations, setLocations] = useState<Partial<LocationModel[] | null>>(
    []
  );

  return (
    <div>
      {locations &&
        locations.length > 0 &&
        locations.map(function (locationModel) {
          return (
            <div>
              <VendorLocation LocationModel={locationModel} />
            </div>
          );
        })}
    </div>
  );
};

export default VendorHome;
