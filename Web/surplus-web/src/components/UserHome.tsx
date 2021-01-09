import React, { useState, useEffect } from "react";
import Filters from "./Filters";
import UserMain from "./UserMain";
import InventoryService from "../services/Inventory";
import LocationService from "../services/Location";
import LocationModel from "../models/Location";
import InventoryModel from "../models/Inventory";
import CustomMap from "./CustomMap";
import ArrayUtils from "../utils/ArrayUtils";
import CardButton from "./CardButton";
import InventoryImage from "../images/Inventory.png";
import VendorImage from "../images/Vendor.png";
import { Grid } from "@material-ui/core";

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
      <Grid container spacing={8} direction="row" style={{ padding: 20 }}>
        <Grid item xs={12} sm={2}>
          <h4>Filters</h4>
          <Filters toggleViewBy={toggleInventory} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Grid container spacing={2} direction="row">
            <Grid item xs={6} sm={3}>
              <CardButton
                height={"100"}
                text="View By Vendor"
                imagePath={VendorImage}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <CardButton
                height={"100"}
                text="View By Inventory"
                imagePath={InventoryImage}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} direction="row" style={{ padding: 40 }}>
            <UserMain
              showInventory={showInventory}
              locations={locations}
              inventory={inventory}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={5}>
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
        </Grid>
      </Grid>
    </div>
  );
};

export default UserHome;
