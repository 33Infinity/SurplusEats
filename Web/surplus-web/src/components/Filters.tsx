import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import { Button } from "@material-ui/core";
import ImageUpload from "./ImageUpload";
import { findAllByTestId } from "@testing-library/react";

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

const Filters: React.FC = () => {
  const ITEM = "Item";
  const VENDOR = "Vendor";
  const classes = useStyles();
  const [viewBy, setViewBy] = React.useState(ITEM);
  const handleViewByChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setViewBy(event.target.value as string);
    //TODO: Tell redux to rerender either vendor list or item list
  };
  const [sortBy, setSortBy] = React.useState("");
  const handleSortByChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortBy(event.target.value as string);
    //TODO: Tell redux to rerender how items are sorted
  };

  function GetItemSortBySelect() {
    const PRICE = "Price";
    const NAME = "Name";
    return (
      <Select value={sortBy} onChange={handleSortByChange}>
        <MenuItem value={PRICE}>{PRICE}</MenuItem>
        <MenuItem value={NAME}>{NAME}</MenuItem>
      </Select>
    );
  }

  function GetVendorSortBySelect() {
    const DISTANCE = "Distance";
    const NAME = "Name";
    return (
      <Select value={sortBy} onChange={handleSortByChange}>
        <MenuItem value={DISTANCE}>{DISTANCE}</MenuItem>
        <MenuItem value={NAME}>{NAME}</MenuItem>
      </Select>
    );
  }

  function test() {
    const blah = "";
  }

  return (
    <div>
      <FormControl>
        <ImageUpload />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>View By</InputLabel>
        <Select value={viewBy} onChange={handleViewByChange}>
          <MenuItem value={ITEM}>{ITEM}</MenuItem>
          <MenuItem value={VENDOR}>{VENDOR}</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Sort By</InputLabel>
        {viewBy == ITEM ? GetItemSortBySelect() : GetVendorSortBySelect()}
      </FormControl>
      {viewBy == ITEM && (
        <div>
          <h5 className="mt-3">Price</h5>
          <div className="px-2">
            <input type="checkbox" checked={false} />
            <span> free</span>
          </div>
          <div className="px-2">
            <input type="checkbox" checked={false} />
            <span> less than $10</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
