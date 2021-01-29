import React, { useState, useEffect } from "react";
import Filters from "../components/Filters";
import UserMain from "../components/UserMain";
import InventoryService from "../services/Inventory";
import LocationService from "../services/Location";
import LocationModel from "../models/Location";
import InventoryModel from "../models/Inventory";
import CustomMap from "../controls/CustomMap";
import ArrayUtils from "../utils/ArrayUtils";
import CardButton from "../controls/CardButton";
import InventoryImage from "../images/Inventory.png";
import VendorImage from "../images/Vendor.png";
import { Grid } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ErrorModel from "../models/Error";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const UserHome: React.FC = () => {
  const ITEM = "Item";
  const VENDOR = "Vendor";
  const PRICE = "Price";
  const DISTANCE = "Distance";
  const NAME = "Name";
  const classes = useStyles();
  const [viewBy, setViewBy] = React.useState(VENDOR);
  const [locations, setLocations] = useState<Partial<LocationModel[] | null>>(
    []
  );
  const [inventory, setInventory] = useState<Partial<InventoryModel[] | null>>(
    []
  );
  const [sortBy, setSortBy] = React.useState(DISTANCE);
  const handleSortByChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortBy(event.target.value as string);
  };
  useEffect(() => {
    getLocationsByLatLon();
  }, []);
  const [showInventory, setShowInventory] = useState(false);
  async function getLocationsByLatLon() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const locationService = new LocationService();
        const response = await locationService.getByLatLon(
          position.coords.latitude,
          position.coords.longitude
        );
        if (!(response instanceof ErrorModel)) {
          setLocations(response);
        } else {
          alert("Error Occurred");
          // TODO: Have this handled appropriately
        }
      });
    } else {
      alert("GeoLocation not enabled");
    }
  }
  async function getInventoryByLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const inventoryService = new InventoryService();
        const response = await inventoryService.getByLocation(
          position.coords.latitude,
          position.coords.longitude
        );
        setInventory(response);
      });
    } else {
      alert("GeoLocation not enabled");
    }
  }
  function GetItemSortBySelect() {
    return (
      <Select value={sortBy} onChange={handleSortByChange}>
        <MenuItem value={PRICE}>{PRICE}</MenuItem>
        <MenuItem value={NAME}>{NAME}</MenuItem>
      </Select>
    );
  }
  function GetVendorSortBySelect() {
    return (
      <Select value={sortBy} onChange={handleSortByChange}>
        <MenuItem value={DISTANCE}>{DISTANCE}</MenuItem>
        <MenuItem value={NAME}>{NAME}</MenuItem>
      </Select>
    );
  }
  function setShowInventoryTrue() {
    setViewBy(ITEM);
    setSortBy(PRICE);
    setShowInventory(true);
    getInventoryByLocation();
  }
  function setShowInventoryFalse() {
    setViewBy(VENDOR);
    setShowInventory(false);
    getLocationsByLatLon();
  }

  return (
    <div>
      <Grid container spacing={8} direction="row" style={{ padding: 20 }}>
        <Grid item xs={12} sm={2}>
          <h4>Filters</h4>
          <a href="">Clear all</a>
          <Filters />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Grid container spacing={2} direction="row">
            <Grid item xs={6} sm={3}>
              <CardButton
                height={"100"}
                text="View By Vendor"
                imagePath={VendorImage}
                handleClickEvent={setShowInventoryFalse}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <CardButton
                height={"100"}
                text="View By Inventory"
                imagePath={InventoryImage}
                handleClickEvent={setShowInventoryTrue}
              />
            </Grid>
            <Grid item xs={6} sm={4}></Grid>
            <Grid item xs={6} sm={2}>
              <FormControl className={classes.formControl}>
                <InputLabel>Sort By</InputLabel>
                {viewBy == ITEM
                  ? GetItemSortBySelect()
                  : GetVendorSortBySelect()}
              </FormControl>
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
