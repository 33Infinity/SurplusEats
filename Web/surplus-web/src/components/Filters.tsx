import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";

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

interface Props {
  toggleViewBy(name: any): any;
}

const Filters: React.FC<Props> = ({ toggleViewBy }) => {
  const ITEM = "Item";
  const VENDOR = "Vendor";
  const classes = useStyles();
  const [viewBy, setViewBy] = React.useState(VENDOR);
  const handleViewByChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setViewBy(event.target.value as string);
    toggleViewBy(event.target.value === ITEM ? true : false);
  };
  const [sortBy, setSortBy] = React.useState("");
  const handleSortByChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortBy(event.target.value as string);
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

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>View By</InputLabel>
        <Select value={viewBy} onChange={handleViewByChange}>
          <MenuItem value={VENDOR}>{VENDOR}</MenuItem>
          <MenuItem value={ITEM}>{ITEM}</MenuItem>
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
