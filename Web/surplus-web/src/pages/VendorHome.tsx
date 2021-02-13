import React, { useEffect, useState } from "react";
import LocationService from "../services/Location";
import VendorService from "../services/Vendor";
import LocationModel from "../models/Location";
import VendorModel from "../models/Vendor";
import ProfileModel from "../models/Profile";
import ErrorModel from "../models/Error";
import VendorLocation from "../components/vendor/VendorLocation";
import {
  confirmWithTwoButtons,
  confirmWithSingleButton,
} from "../controls/Confirmation";
import { connect } from "react-redux";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import VendorLocationDialog from "../components/vendor/VendorLocationDialog";
import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      height: "200px",
      width: "200px",
    },
    center: {
      textAlign: "center",
      margin: "auto",
    },
  })
);

type Redux = {
  currentUser: ProfileModel;
};

const VendorHome: React.FC<Redux> = ({ currentUser }) => {
  const classes = useStyles();
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
    let locations = await LocationService.getByVendor(currentUser?.Email);
    if (locations instanceof ErrorModel) {
      confirmWithSingleButton(
        "Ok",
        "Error",
        "Failed to retrieve locations?",
        null
      );
      return;
    } else {
      const vendorModel =
        locations != null && locations.length > 0
          ? locations[0].VendorModel
          : null;
      if (vendorModel == null) {
        let vendorResponse = await VendorService.getByEmail(currentUser?.Email);
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
        if (!(locations instanceof ErrorModel)) {
          setLocations(locations);
        }
      }
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
    await LocationService.delete(aLocationId);
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
    await LocationService.add(aLocationModel);
    getByVendor();
  }
  async function updateLocation(aLocationModel) {
    setLocation(aLocationModel);
    await LocationService.update(aLocationModel);
    getByVendor();
  }
  return (
    <div>
      <div className={classes.center}>
        <h1>Locations</h1>
        <img src={vendorModel?.ImageUrl} className={classes.image}></img>
      </div>
      <br></br>
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
