import React, { useState, useEffect } from "react";
import Filters from "./Filters";
import UserMain from "./UserMain";
import InventoryService from "../services/Inventory";
import LocationService from "../services/Location";
import LocationModel from "../models/Location";
import InventoryModel from "../models/Inventory";

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
          <div className="col-8">
            <UserMain
              showInventory={showInventory}
              locations={locations}
              inventory={inventory}
            />
          </div>
          <div className="col-2">Column3</div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
