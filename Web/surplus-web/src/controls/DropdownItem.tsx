import React from 'react';
import { makeStyles } from "@material-ui/core";
import NotificationModel from "../models/Notification";
import '../fonts/fonts.scss';
import '../fonts/font-main.scss';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
        fontFamily: 'RobotoRegular serif',   
        textOverflow: 'ellipsis',
        overflow: 'hidden', 
        whiteSpace: 'nowrap',        
    }    
}));

type MenuItemType = {    
    notificationItem: NotificationModel
  };

const DropdownItem: React.FC<MenuItemType> = ({ notificationItem }) => {
    const classes = useStyles();
    return (
        <ListItem button className={classes.cartItem}>
            <ListItemIcon>
                <AlarmOnOutlined />
            </ListItemIcon>
               <span className={classes.itemDetails}>{notificationItem.Subject}</span>                       
        </ListItem>
    )
};

export default DropdownItem;