import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";

class ViewBy {
  ITEM: string = "Item";
  VENDOR: string = "Vendor";
}

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
  const [viewBy, setViewBy] = React.useState("");
  const handleViewByChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setViewBy(event.target.value as string);
  };
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>View By</InputLabel>
        <Select value={viewBy ? viewBy : ITEM} onChange={handleViewByChange}>
          <MenuItem value={ITEM}>Item</MenuItem>
          <MenuItem value={VENDOR}>Vendor</MenuItem>
        </Select>
      </FormControl>
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
  );
};

export default Filters;
