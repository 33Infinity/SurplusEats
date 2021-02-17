import React from 'react';
import { makeStyles } from "@material-ui/core";
import NotificationModel from "../models/Notification";
import CartModel from "../models/Cart";
import '../fonts/fonts.scss';
import '../fonts/font-main.scss';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { AlarmOnOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    cartItem: {
        width: '100%',
        display: 'flex',
        height: '50px',
        marginBottom: '2px',               
    },    
    itemDetails: {
        width: '170px',        
        fontFamily: 'RobotoRegular',   
        textOverflow: 'ellipsis',
        overflow: 'hidden', 
        whiteSpace: 'nowrap',
        color: 'black'        
    },
    icon: {
        minWidth: '40px',
    }   
}));

type MenuItemType = {    
    item: NotificationModel | CartModel
};

const DropdownItem: React.FC<MenuItemType> = ({ item }) => {
    const classes = useStyles();
    const subject = item instanceof NotificationModel ? item.Subject : "";
    return (
        <ListItem button className={classes.cartItem}>
            <ListItemIcon className={classes.icon}>
                <AlarmOnOutlined />
            </ListItemIcon>
            <span className={classes.itemDetails}>{subject}</span>                       
        </ListItem>
    )
};

export default DropdownItem;