import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import DropdownItem from "./DropdownItem";
import HeaderEventType from "../utils/Enum";

const useStyles = makeStyles((theme) => ({
  menuDropdown: {
    position: "absolute",
    width: "240px",
    height: "340px",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    border: "1px solid black",
    backgroundColor: "white",
    top: " 90px",
    right: "40px",
    zIndex: 5,
  },
  listItems: {
    height: "240px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  button: {
    marginTop: "auto",
  },
}));

type MyType = {
  dropDownType: HeaderEventType;
  btnEvent: () => void;
};

const DropdownMenu: React.FC<MyType> = ({ dropDownType, btnEvent }) => {
  const classes = useStyles();
  const btnText =
    dropDownType === HeaderEventType.IsMail ||
    dropDownType === HeaderEventType.IsNotification
      ? "CLOSE"
      : "CHECKOOUT";
  return (
    <div className={classes.menuDropdown}>
      <div className={classes.listItems}>
        <DropdownItem />
        <DropdownItem />
      </div>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={btnEvent}
      >
        {btnText}
      </Button>
    </div>
  );
};

export default DropdownMenu;
