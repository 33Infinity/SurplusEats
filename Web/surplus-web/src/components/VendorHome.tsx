import React, { useEffect, useState } from "react";
import LocationService from "../services/Location";
import VendorService from "../services/Vendor";
import LocationModel from "../models/Location";
import VendorModel from "../models/Vendor";
import ProfileModel from "../models/Profile";
import ErrorModel from "../models/Error";
import VendorLocation from "./VendorLocation";
import {
  confirmWithTwoButtons,
  confirmWithSingleButton,
} from "../controls/Confirmation";
import { connect } from "react-redux";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import VendorLocationDialog from "./VendorLocationDialog";

type Redux = {
  currentUser: ProfileModel;
};

const VendorHome: React.FC<Redux> = ({ currentUser }) => {
  let locationService = new LocationService();
  let vendorService = new VendorService();
  useEffect(() => {
    getByVendor();
  }, []);
  const [vendorModel, setVendorModel] = useState<VendorModel>();
  const [locations, setLocations] = useState<LocationModel[] | null>([]);
  const [openNewLocationDialog, setOpenNewLocationDialog] = React.useState(
    false
  );
  const [newLocation, setNewLocation] = useState(true);
  const [location, setLocation] = useState<LocationModel>(
    LocationModel.NewBlankLocation(vendorModel)
  );
  function OnLocationUpdate(aName, aValue) {
    setLocation({
      ...location,
      [aName]: aValue,
    });
  }
  async function getByVendor() {
    locationService = new LocationService();
    let locations = await locationService.getByVendor(currentUser?.Email);
    const vendorModel = locations != null ? locations[0].VendorModel : null;
    if (vendorModel == null) {
      vendorService = new VendorService();
      let vendorResponse = await vendorService.getByEmail(currentUser?.Email);
      if (vendorResponse instanceof ErrorModel) {
        confirmWithSingleButton(
          "Ok",
          "Vendor Error",
          "Vendor Not Found?",
          null
        );
        return;
      }
      setVendorModel(vendorResponse);
    } else {
      setVendorModel(vendorModel);
      setLocations(locations);
    }
  }
  function editLocation(aLocationModel: LocationModel) {
    setOpenNewLocationDialog(true);
    setLocation(aLocationModel);
    setNewLocation(false);
  }
  async function deleteLocation(aLocationId) {
    confirmWithTwoButtons(
      "Yes",
      "No",
      "Delete Confirmation",
      "Are you sure you want to delete this location?",
      () => processDeleteConfirmation(aLocationId),
      null
    );
  }
  async function processDeleteConfirmation(aLocationId) {
    await locationService.deleteLocation(aLocationId);
    getByVendor();
  }
  function handleOpenNewLocationDialog(isNew) {
    if (isNew) {
      setLocation(LocationModel.NewBlankLocation(vendorModel));
    }
    setOpenNewLocationDialog(true);
  }
  function handleCloseDialog() {
    setOpenNewLocationDialog(false);
  }
  async function addNewLocation(aLocationModel) {
    setLocation(aLocationModel);
    await locationService.addLocation(aLocationModel);
    getByVendor();
  }
  async function updateLocation(aLocationModel) {
    setLocation(aLocationModel);
    await locationService.updateLocation(aLocationModel);
    getByVendor();
  }
  return (
    <div>
      <h1>Locations</h1>
      <img src={vendorModel?.ImageUrl}></img>
      {locations &&
        locations.length > 0 &&
        locations.map(function (locationModel) {
          return (
            <div>
              {locationModel != null && (
                <VendorLocation
                  location={locationModel}
                  deleteLocation={deleteLocation}
                  editLocation={editLocation}
                />
              )}
            </div>
          );
        })}
      <VendorLocationDialog
        locationModel={location}
        vendorModel={
          vendorModel != null ? vendorModel : VendorModel.NewBlankVendor()
        }
        onCloseDialog={handleCloseDialog}
        dialogOpen={openNewLocationDialog}
        newLocation={newLocation}
        setLocation={OnLocationUpdate}
        addLocation={addNewLocation}
        updateLocation={updateLocation}
      ></VendorLocationDialog>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => handleOpenNewLocationDialog(true)}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(VendorHome);
