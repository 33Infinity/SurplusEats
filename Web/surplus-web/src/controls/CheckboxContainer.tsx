import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles, createStyles, Grid, Theme } from "@material-ui/core";
import StringUtils from "../utils/StringUtils";

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
  handleOpenClick: any;
  handleCloseClick: any;
  handleCheckboxChange: any;
  checkedItems: string[];
  potentiallyCheckedItems: string[];
  linkText: string;
}

const CheckboxContainer: React.FC<Props> = ({
  open,
  handleOpenClick,
  handleCloseClick,
  handleCheckboxChange,
  checkedItems,
  potentiallyCheckedItems,
  linkText,
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
        <a href="javascript:void(0)" onClick={handleOpenClick}>
          {linkText}
        </a>
        <Dialog
          open={open}
          onClose={handleCloseClick}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{linkText}</DialogTitle>
          <Divider className={classes.dividerMargin} />
          <DialogContent>
            <Grid container spacing={2} direction="row">
              <FormControl component="fieldset" className={classes.formControl}>
                {potentiallyCheckedItems.map((eachItem) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedItems.includes(eachItem)}
                          onChange={handleLocalCheckboxChange}
                          name={eachItem}
                          classes={{ root: classes.input }}
                        />
                      }
                      label={StringUtils.capitalizeFirstLetter(eachItem)}
                    />
                  );
                })}
              </FormControl>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </div>
  );
};

export default CheckboxContainer;
