import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import DropdownItem from "./DropdownItem";
import HeaderEventType from "../utils/Enum";
import NotificationModel from "../models/Notification";

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
    zIndex: 99999999999999,
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

type MenuType = {
  dropDownType: HeaderEventType;
  btnEvent: () => void;
  notificationItems: Array<NotificationModel>
};

const DropdownMenu: React.FC<MenuType> = ({ dropDownType, btnEvent, notificationItems }) => {
  const classes = useStyles();
  const btnText =    
    dropDownType === HeaderEventType.IsNotification
      ? "CLOSE"
      : "CHECKOOUT";
  return (
    <div className={classes.menuDropdown}>
      <div className={classes.listItems}>
        {
          notificationItems.map(notification => <DropdownItem notificationItem={notification} />)
        }
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
