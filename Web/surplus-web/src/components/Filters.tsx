import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    formControl: {
      margin: theme.spacing(3),
    },
    input: {
      height: "20px",
      boxSizing: "border-box",
    },
    button: {
      margin: theme.spacing(1),
      borderRadius: "5em",
    },
    dividerMargin: {
      marginTop: "15px",
      marginBottom: "15px",
    },
  })
);

interface Props {
  applyFilters: (
    filters: unknown,
    checked: boolean,
    filterName: string
  ) => void;
}

const Filters: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [checkBoxValues, setCheckBoxValues] = React.useState({
    openNow: false,
    free: false,
    lessThanTen: false,
    betweenTenAndTwenty: false,
    betweenTwentyAndFourty: false,
    greaterThanFourty: false,
    american: false,
    chinese: false,
    mexican: false,
    restaurant: false,
    grocery: false,
    bar: false,
    pizza: false,
    burgers: false,
    sushi: false,
    deli: false,
    organic: false,
    bbq: false,
    wings: false,
    tacos: false,
    greek: false,
    dessert: false,
    seafood: false,
  });
  const [radioButtonValue, setRadioButtonValue] = React.useState("");
  const [openMoreCategories, setOpenMoreCategories] = React.useState(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckBoxValues({
      ...checkBoxValues,
      [event.target.name]: event.target.checked,
    });
    props.applyFilters(checkBoxValues, event.target.checked, event.target.name);
  };
  const handleRadioButtonChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRadioButtonValue((event.target as HTMLInputElement).value);
  };
  const {
    openNow,
    free,
    lessThanTen,
    betweenTenAndTwenty,
    betweenTwentyAndFourty,
    greaterThanFourty,
    american,
    chinese,
    mexican,
    restaurant,
    grocery,
    bar,
    pizza,
    sushi,
    burgers,
    deli,
    organic,
    bbq,
    wings,
    tacos,
    greek,
    dessert,
    seafood,
  } = checkBoxValues;
  const handleOpenMoreCategoriesClick = () => {
    setOpenMoreCategories(true);
  };
  const handleCloseMoreCategoriesClick = () => {
    setOpenMoreCategories(false);
  };
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Suggested</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={openNow}
                onChange={handleCheckboxChange}
                name="openNow"
                classes={{ root: classes.input }}
              />
            }
            label="Open Now"
          />
        </FormGroup>
        <Divider className={classes.dividerMargin} />
        <FormLabel component="legend">Price</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={free}
                onChange={handleCheckboxChange}
                name="free"
                classes={{ root: classes.input }}
              />
            }
            label="Free"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={lessThanTen}
                onChange={handleCheckboxChange}
                name="lessThanTen"
                classes={{ root: classes.input }}
              />
            }
            label="Less Than $10"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={betweenTenAndTwenty}
                onChange={handleCheckboxChange}
                name="betweenTenAndTwenty"
                classes={{ root: classes.input }}
              />
            }
            label="$10 - $20"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={betweenTwentyAndFourty}
                onChange={handleCheckboxChange}
                name="betweenTwentyAndFourty"
                classes={{ root: classes.input }}
              />
            }
            label="$20 - $40"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={greaterThanFourty}
                onChange={handleCheckboxChange}
                name="greaterThanFourty"
                classes={{ root: classes.input }}
              />
            }
            label="Greater Than $40"
          />
        </FormGroup>
        <Divider className={classes.dividerMargin} />
        <FormLabel component="legend">Category</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={american}
                onChange={handleCheckboxChange}
                name="american"
                classes={{ root: classes.input }}
              />
            }
            label="American"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={chinese}
                onChange={handleCheckboxChange}
                name="chinese"
                classes={{ root: classes.input }}
              />
            }
            label="Chinese"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={mexican}
                onChange={handleCheckboxChange}
                name="mexican"
                classes={{ root: classes.input }}
              />
            }
            label="Mexican"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={restaurant}
                onChange={handleCheckboxChange}
                name="restaurant"
                classes={{ root: classes.input }}
              />
            }
            label="Restaurant"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={grocery}
                onChange={handleCheckboxChange}
                name="grocery"
                classes={{ root: classes.input }}
              />
            }
            label="Grocery"
          />
          <a href="javascript:void(0)" onClick={handleOpenMoreCategoriesClick}>
            See all
          </a>
          <Dialog
            open={openMoreCategories}
            onClose={handleCloseMoreCategoriesClick}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">More Categories</DialogTitle>
            <Divider className={classes.dividerMargin} />
            <DialogContent>
              <Grid container spacing={2} direction="row">
                <Grid item xs={12} sm={4}>
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={bar}
                            onChange={handleCheckboxChange}
                            name="bar"
                            classes={{ root: classes.input }}
                          />
                        }
                        label="Bar"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={burgers}
                            onChange={handleCheckboxChange}
                            name="burgers"
                            classes={{ root: classes.input }}
                          />
                        }
                        label="Burgers"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={deli}
                            onChange={handleCheckboxChange}
                            name="deli"
                            classes={{ root: classes.input }}
                          />
                        }
                        label="Deli"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={bbq}
                            onChange={handleCheckboxChange}
                            name="bbq"
                            classes={{ root: classes.input }}
                          />
                        }
                        label="Barbecue"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={tacos}
                            onChange={handleCheckboxChange}
                            name="tacos"
                            classes={{ root: classes.input }}
                          />
                        }
                        label="Tacos"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={dessert}
                            onChange={handleCheckboxChange}
                            name="dessert"
                            classes={{ root: classes.input }}
                          />
                        }
                        label="Dessert"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={sushi}
                            onChange={handleCheckboxChange}
                            name="sushi"
                            classes={{ root: classes.input }}
                          />
                        }
                        label="Sushi"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={pizza}
                            onChange={handleCheckboxChange}
                            name="pizza"
                            classes={{ root: classes.input }}
                          />
                        }
                        label="Pizza"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={organic}
                            onChange={handleCheckboxChange}
                            name="organic"
                            classes={{ root: classes.input }}
                          />
                        }
                        label="Organic"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={wings}
                            onChange={handleCheckboxChange}
                            name="wings"
                            classes={{ root: classes.input }}
                          />
                        }
                        label="Wings"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={greek}
                            onChange={handleCheckboxChange}
                            name="greek"
                            classes={{ root: classes.input }}
                          />
                        }
                        label="Greek"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={seafood}
                            onChange={handleCheckboxChange}
                            name="seafood"
                            classes={{ root: classes.input }}
                          />
                        }
                        label="Seafood"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseMoreCategoriesClick} color="primary">
                Cancel
              </Button>
              <Button onClick={handleCloseMoreCategoriesClick} color="primary">
                Search
              </Button>
            </DialogActions>
          </Dialog>
          <Divider className={classes.dividerMargin} />
        </FormGroup>
        <FormLabel component="legend">Distance</FormLabel>
        <RadioGroup
          aria-label="distance"
          name="distance"
          value={radioButtonValue}
          onChange={handleRadioButtonChange}
        >
          <FormControlLabel
            value="withinTenMiles"
            control={<Radio />}
            label="Within 10 Miles"
            classes={{ root: classes.input }}
          />
          <FormControlLabel
            value="withinFiveMiles"
            control={<Radio />}
            label="Within 5 Miles"
            classes={{ root: classes.input }}
          />
          <FormControlLabel
            value="withinOneMile"
            control={<Radio />}
            label="Within 1 Mile"
            classes={{ root: classes.input }}
          />
          <FormControlLabel
            value="withinFourBlocks"
            control={<Radio />}
            label="Within Four Blocks"
            classes={{ root: classes.input }}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default Filters;
