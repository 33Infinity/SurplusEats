import React, { useState } from "react";
import VendorCategory from "../../models/VendorCategory";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles, createStyles, Grid, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

interface Props {
  open: boolean;
  handleOpenCategoriesClick: any;
  handleCloseCategoriesClick: any;
  handleCheckboxChange: any;
  categories: string[];
}

const VendorCategories: React.FC<Props> = ({
  open,
  handleOpenCategoriesClick,
  handleCloseCategoriesClick,
  handleCheckboxChange,
  categories,
}) => {
  const classes = useStyles();
  const handleLocalCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleCheckboxChange(event.target.name, event.target.checked);
  };
  return (
    <div>
      <Grid item xs={12}>
        <a href="javascript:void(0)" onClick={handleOpenCategoriesClick}>
          Categories
        </a>
        <Dialog
          open={open}
          onClose={handleCloseCategoriesClick}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Categories</DialogTitle>
          <Divider className={classes.dividerMargin} />
          <DialogContent>
            <Grid container spacing={2} direction="row">
              <FormControl component="fieldset" className={classes.formControl}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={categories.includes("bar")}
                      onChange={handleLocalCheckboxChange}
                      name="bar"
                      classes={{ root: classes.input }}
                    />
                  }
                  label="Bar"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={categories.includes("restaurant")}
                      onChange={handleLocalCheckboxChange}
                      name="restaurant"
                      classes={{ root: classes.input }}
                    />
                  }
                  label="Restaurant"
                />
              </FormControl>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </div>
  );
};

export default VendorCategories;
