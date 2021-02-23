import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import HeaderEventType from "../utils/Enum";
import Menu from "./Menu";
import NotificationModel from "../models/Notification";
import CartModel from "../models/Cart";
import { ShoppingCart } from "@material-ui/icons";
import { connect } from "react-redux";
import { markAsRead } from "../redux/notification/notification.actions";
import { notificationsItems } from "../redux/notification/notification.selectors";

type IconType = {
    count: number;
    dialogType:  HeaderEventType.IsNotification | HeaderEventType.IsCart;
    items: Array<NotificationModel | CartModel>;
    notifications: Array<NotificationModel>;
    markAsRead: (notifyItems: Array<NotificationModel>) => void;
};

const NavIcon: React.FC<IconType> = ({count, dialogType, items, notifications, markAsRead}) => {

    let wrapperRef = React.useRef<HTMLDivElement>(null);   
    const [showDialog, setShowDialog] = React.useState(false);    

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          setShowDialog(false);
        }
    };    

    const toggleDialog = () => {
        setShowDialog(!showDialog);
    };

    let cntrl;
    switch (dialogType) {
        case HeaderEventType.IsNotification: {           
            cntrl = <NotificationsIcon onClick={() => {markAsRead(notifications); toggleDialog();}} />;
            break;
        }
        case HeaderEventType.IsCart: {
            cntrl = <ShoppingCart onClick={() => {toggleDialog();}} />;
            break;
        }       
        default: 
            break;
    }    

    return (
        <>
            <IconButton color="inherit">
                <Badge badgeContent={count} color="secondary">
                    {cntrl} 
                </Badge>
            </IconButton>    
            {showDialog ? (
                <div ref={wrapperRef}>
                    <Menu items={items} dropDownType={dialogType} btnEvent={toggleDialog} />
                </div>
            ) : null}
        </>
    )
};

const mapDispatchToProps = (dispatch) => ({
    markAsRead: (notifications) => dispatch(markAsRead(notifications)),
});

const mapStateToProps = (state) => ({   
    notifications: notificationsItems(state),    
});  

export default connect(mapStateToProps, mapDispatchToProps)(
    React.memo(NavIcon)
);

