import React, { useState, useEffect } from "react";
import Filters from "./Filters";
import UserMain from "./UserMain";
import InventoryService from "../services/Inventory";
import LocationService from "../services/Location";
import LocationModel from "../models/Location";
import InventoryModel from "../models/Inventory";
import CustomMap from "./CustomMap";
import ArrayUtils from "../utils/ArrayUtils";

const UserHome: React.FC = () => {
  const [locations, setLocations] = useState<Partial<LocationModel[] | null>>(
    []
  );
  const [inventory, setInventory] = useState<Partial<InventoryModel[] | null>>(
    []
  );
  useEffect(() => {
    getLocationsByLatLon();
  }, []);
  const [showInventory, setShowInventory] = useState(false);
  async function getLocationsByLatLon() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const locationService = new LocationService();
        locationService
          .getByLatLon(position.coords.latitude, position.coords.longitude)
          .then((response) => {
            setLocations(response);
          });
      });
    } else {
      alert("GeoLocation not enabled");
    }
  }
  async function getInventoryByLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const inventoryService = new InventoryService();
        inventoryService
          .getByLocation(position.coords.latitude, position.coords.longitude)
          .then((response) => {
            setInventory(response);
          });
      });
    } else {
      alert("GeoLocation not enabled");
    }
  }
  function toggleInventory(aValue) {
    setShowInventory(aValue);
    if (aValue) {
      getInventoryByLocation();
    } else {
      getLocationsByLatLon();
    }
  }

  return (
    <div>
      <div className="container-fluid">
        <h1>Test</h1>
        <div className="row">
          <div className="col-2">
            <Filters toggleViewBy={toggleInventory} />
          </div>
          <div className="col-6">
            <UserMain
              showInventory={showInventory}
              locations={locations}
              inventory={inventory}
            />
          </div>
          <div className="col-4">
            <div className="leaflet-container">
              {locations != null &&
                ArrayUtils.firstOrDefault(locations, "Latitude", 0) > 0 && (
                  <CustomMap
                    centerLatitude={ArrayUtils.firstOrDefault(
                      locations,
                      "Latitude",
                      0
                    )}
                    centerLongitude={ArrayUtils.firstOrDefault(
                      locations,
                      "Longitude",
                      0
                    )}
                    zoom={11}
                    locationModels={
                      locations != null ? locations : new LocationModel[0]()
                    }
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
