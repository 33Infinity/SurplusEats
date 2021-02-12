import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import HeaderEventType from "../utils/Enum";
import DropdownMenu from "../controls/DropdownMenu";
import NotificationModel from "../models/Notification";
import { ShoppingCart } from "@material-ui/icons";

type IconType = {
    count: number;
    dialogType:  HeaderEventType.IsNotification | HeaderEventType.IsCart;
    items: Array<NotificationModel | string>;
};

const NavIcon: React.FC<IconType> = ({count, dialogType, items}) => {

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
            cntrl = <NotificationsIcon onClick={() => {toggleDialog();}} />;
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
                    <DropdownMenu items={items} dropDownType={dialogType} btnEvent={toggleDialog} />
                </div>
            ) : null}
        </>
    )
};

export default React.memo(NavIcon);

