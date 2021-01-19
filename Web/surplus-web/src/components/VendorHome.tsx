import React, { useEffect, useState } from "react";
import LocationService from "../services/Location";
import LocationModel from "../models/Location";
import VendorModel from "../models/Vendor";
import ProfileModel from "../models/Profile";
import VendorLocation from "./VendorLocation";
import { confirmWithTwoButtons } from "./Confirmation";
import { connect } from "react-redux";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import VendorLocationDialog from "./VendorLocationDialog";

type NewLocationState = {
  name: string;
  address: string;
  postalCode: string;
  latitude: string;
  longitude: string;
};

type Redux = {
  currentUser: ProfileModel;
};

const VendorHome: React.FC<Redux> = ({ currentUser }) => {
  let locationService = new LocationService();
  useEffect(() => {
    getByVendor();
  }, []);
  const [vendorModel, setVendorModel] = useState<VendorModel>();
  const [locations, setLocations] = useState<Partial<LocationModel[] | null>>(
    []
  );
  const [newLocation, setNewLocation] = useState<Partial<NewLocationState>>({
    name: "",
    address: "",
    postalCode: "",
    latitude: "",
    longitude: "",
  });
  const [openNewLocationDialog, setOpenNewLocationDialog] = React.useState(
    false
  );
  function getByVendor() {
    locationService = new LocationService();
    locationService.getByVendor(currentUser?.Email).then((response) => {
      const vendorModel =
        response != null
          ? response[0].VendorModel
          : VendorModel.NewBlankVendor();
      setVendorModel(vendorModel);
      setLocations(response);
    });
  }
  const onNewLocationUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLocation({
      ...newLocation,
      [event.target.name]: event.target.value,
    });
  };
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
    locationService.deleteLocation(aLocationId).then(() => {
      getByVendor();
    });
  }
  const handleOpenNewLocationDialog = () => {
    setOpenNewLocationDialog(true);
  };
  const handleCloseNewLocationDialog = () => {
    setOpenNewLocationDialog(false);
  };
  return (
    <div>
      <h1>Locations</h1>
      <img src={vendorModel?.ImageUrl}></img>
      {locations &&
        locations.length > 0 &&
        locations.map(function (locationModel) {
          return (
            <div>
              <VendorLocation
                location={locationModel}
                deleteLocation={deleteLocation}
                handleOpenNewLocationDialog={handleOpenNewLocationDialog}
              />
            </div>
          );
        })}
      <VendorLocationDialog
        locationModel={LocationModel.NewBlankLocation(vendorModel)}
        vendorModel={
          vendorModel != null ? vendorModel : VendorModel.NewBlankVendor()
        }
        onCloseDialog={handleCloseNewLocationDialog}
        dialogOpen={openNewLocationDialog}
        newLocation={true}
      ></VendorLocationDialog>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => handleOpenNewLocationDialog()}
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
