import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import DropdownItem from "./DropdownItem";
import HeaderEventType from "../utils/Enum";
import NotificationModel from "../models/Notification";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles((theme) => ({
  menuDropdown: {
    position: "absolute",
    width: "240px",
    height: "340px",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    border: "1px solid black",
    backgroundColor: "white",
    top: " 90px",
    right: "40px",
    zIndex: 99999999999999,
  },
  listItems: {
    height: "240px",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
  button: {
    marginTop: "auto",
  },
}));

type MenuType = {
  dropDownType: HeaderEventType;
  btnEvent: () => void;
  items: Array<NotificationModel | string>;
};

const DropdownMenu: React.FC<MenuType> = ({
  dropDownType,
  btnEvent,
  items,
}) => {
  const classes = useStyles();
  const btnText =
    dropDownType === HeaderEventType.IsNotification ? "CLOSE" : "CHECKOUT";
  return (
    <div className={classes.menuDropdown}>
      <div className={classes.listItems}>
        <List component="nav">
          {dropDownType === HeaderEventType.IsNotification ? (
            items.map((item) => <DropdownItem item={item} />)
          ) : (
            <ListItem>Empty...</ListItem>
          )}
        </List>
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
