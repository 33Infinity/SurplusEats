import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  makeStyles,
  createStyles,
  Container,
  Typography,
  Grid,
  Button,
  Theme,
} from "@material-ui/core";
import ProfileModel from "../models/Profile";
import VendorModel from "../models/Vendor";
import ErrorModel from "../models/Error";
import StringUtil from "../utils/StringUtils";
import VendorService from "../services/Vendor";
import DefaultImage from "../images/InventoryBlank.png";
import ImageUpload from "../controls/ImageUpload";
import { confirmWithSingleButton } from "../controls/Confirmation";
import Error from "../components/Error";
import { ValidatorForm } from "react-material-ui-form-validator";
import FormTextField from "../controls/FormTextField";
import BackDrop from "../controls/Backdrop";
import FileService from "../services/File";
import CheckboxContainer from "../controls/CheckboxContainer";
import VendorCategory from "../models/VendorCategory";
import VendorCategories from "../data/VendorCategories";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(3),
    },
    image: {
      height: "80px",
      width: "80px",
    },
    dividerMargin: {
      marginTop: "15px",
      marginBottom: "15px",
    },
    formControl: {
      margin: theme.spacing(3),
    },
    input: {
      height: "20px",
      boxSizing: "border-box",
    },
  })
);

type Redux = {
  currentUser: ProfileModel;
};

const VendorProfile: React.FC<Redux> = ({ currentUser }) => {
  const classes = useStyles();
  let validationForm: ValidatorForm = React.createRef();
  useEffect(() => {
    getByEmail();
  }, []);
  const [vendor, setVendor] = useState<Partial<VendorModel>>();
  const [error, setError] = useState<ErrorModel | null>(null);
  const [saveProfile, setSaveProfile] = useState(true);
  const [selectedFile, setSelectedFile] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onVendorUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSaveProfile(false);
    setVendor({
      ...vendor,
      [event.target.name]: event.target.value,
    });
  };
  const [openCategories, setOpenCategories] = React.useState(false);
  function handleCheckboxChange(aName, isChecked) {
    setSaveProfile(false);
    let categories = vendor?.Categories ? vendor.Categories : [];
    if (isChecked) {
      categories.push(VendorCategory.NewVendorCategory(aName, null, null));
    } else {
      categories = categories.filter(
        (eachCategory) => eachCategory.Name !== aName
      );
    }
    const v = vendor;
    if (v instanceof VendorModel) {
      v.Categories = categories;
    }
    setVendor(v);
  }
  const handleOpenCategoriesClick = () => {
    setOpenCategories(true);
  };
  const handleCloseCategoriesClick = () => {
    setOpenCategories(false);
  };
  function onFileSelect(aFile) {
    setSaveProfile(false);
    setSelectedFile(aFile);
  }
  async function getByEmail() {
    const response = await VendorService.getByEmail(currentUser?.Email);
    if (response instanceof ErrorModel) {
      setError(response);
      return;
    }
    setVendor(response);
  }
  async function updateProfile() {
    setIsLoading(true);
    if (!StringUtil.nullOrEmpty(selectedFile)) {
      if (vendor?.ImageUrl !== "") {
        await FileService.delete(vendor?.ImageUrl);
      }
      const imageUrl = await FileService.add(selectedFile, vendor?.Id);
      if (vendor != null) {
        vendor.ImageUrl = imageUrl.toString();
      }
    }
    const response = await VendorService.update(vendor);
    if (response instanceof VendorModel) {
      confirmWithSingleButton("Ok", "Vendor Update", "Successful Update!", () =>
        processSuccessfulUpdate(response)
      );
    } else {
      confirmWithSingleButton(
        "Ok",
        "Failed To Update",
        response.ErrorMessage,
        null
      );
    }
    setIsLoading(false);
  }

  function processSuccessfulUpdate(aResponse) {
    setVendor(aResponse);
    setSaveProfile(true);
  }

  if (error != null) {
    return <Error redirectUrl={""} error={error} />;
  }
  return (
    <div>
      <div className="center">
        <BackDrop isLoading={isLoading} />
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Edit Profile
            </Typography>
            <ValidatorForm
              ref={validationForm}
              className={classes.form}
              debounceTime={1000}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <img
                    className={classes.image}
                    src={
                      vendor instanceof VendorModel
                        ? StringUtil.nullOrEmpty(vendor?.ImageUrl)
                          ? DefaultImage
                          : vendor.ImageUrl
                        : DefaultImage
                    }
                  ></img>
                </Grid>
                <Grid item xs={12}>
                  <ImageUpload
                    onSelectedFile={onFileSelect}
                    buttonText="Edit Vendor Profile Image"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    variant="outlined"
                    fullWidth
                    name="Name"
                    label="Name"
                    value={vendor?.Name != null ? vendor.Name : ""}
                    onChange={onVendorUpdate}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    variant="outlined"
                    fullWidth
                    name="Description"
                    label="Description"
                    value={
                      vendor?.Description != null ? vendor.Description : ""
                    }
                    onChange={onVendorUpdate}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <CheckboxContainer
                  open={openCategories}
                  handleOpenClick={handleOpenCategoriesClick}
                  handleCloseClick={handleCloseCategoriesClick}
                  handleCheckboxChange={handleCheckboxChange}
                  checkedItems={
                    vendor?.Categories
                      ? vendor.Categories.map(
                          (eachCategory) => eachCategory.Name
                        )
                      : []
                  }
                  potentiallyCheckedItems={VendorCategories}
                  linkText={"Categories"}
                />
              </Grid>
              <Button
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={updateProfile}
                disabled={saveProfile}
              >
                Save Profile
              </Button>
            </ValidatorForm>
          </div>
        </Container>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(VendorProfile);
