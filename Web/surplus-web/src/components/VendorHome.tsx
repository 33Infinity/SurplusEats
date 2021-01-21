import React, { useEffect, useState } from "react";
import LocationService from "../services/Location";
import VendorService from "../services/Vendor";
import LocationModel from "../models/Location";
import VendorModel from "../models/Vendor";
import ProfileModel from "../models/Profile";
import ErrorModel from "../models/Error";
import VendorLocation from "./VendorLocation";
import { confirmWithTwoButtons } from "./Confirmation";
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
  const [locations, setLocations] = useState<Partial<LocationModel[] | null>>(
    []
  );
  const [openNewLocationDialog, setOpenNewLocationDialog] = React.useState(
    false
  );
  const [newLocation, setNewLocation] = useState(true);
  const [locationToUpdate, setLocationToUpdate] = useState<LocationModel>(
    LocationModel.NewBlankLocation(vendorModel)
  );
  async function getByVendor() {
    locationService = new LocationService();
    locationService.getByVendor(currentUser?.Email).then((response) => {
      const vendorModel = response != null ? response[0].VendorModel : null;
      if (vendorModel == null) {
        vendorService = new VendorService();
        vendorService.getByEmail(currentUser?.Email).then((vendorResponse) => {
          if (vendorResponse instanceof ErrorModel) {
            alert("Vendor not found");
            return;
          }
          setVendorModel(vendorResponse);
        });
      } else {
        setVendorModel(vendorModel);
        setLocations(response);
      }
    });
  }
  function editLocation(aLocationModel: LocationModel) {
    setOpenNewLocationDialog(true);
    setLocationToUpdate(aLocationModel);
    setNewLocation(false);
  }
  /* function updateLocation(aLocationModel: LocationModel) {
    const locationService = new LocationService();
    locationService.updateLocation(aLocationModel).then(() => {
      getByVendor();
    });
  } */
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
  function handleOpenNewLocationDialog() {
    setLocationToUpdate(LocationModel.NewBlankLocation(vendorModel));
    setOpenNewLocationDialog(true);
  }
  function handleCloseNewLocationDialog(refreshLocations) {
    if (refreshLocations) {
      getByVendor();
    }
    setOpenNewLocationDialog(false);
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
        locationModel={locationToUpdate}
        vendorModel={
          vendorModel != null ? vendorModel : VendorModel.NewBlankVendor()
        }
        onCloseDialog={handleCloseNewLocationDialog}
        dialogOpen={openNewLocationDialog}
        reopenDialog={handleOpenNewLocationDialog}
        newLocation={newLocation}
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
