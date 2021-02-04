import React from 'react';
import { makeStyles } from "@material-ui/core";
import NotificationModel from "../models/Notification";
import '../fonts/fonts.css';

const useStyles = makeStyles((theme) => ({
    cartItem: {
        width: '100%',
        display: 'flex',
        height: '50px',
        marginBottom: '5px',
    },
    img: {
        width: '30%'
    },
    itemDetails: {
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '5px 5px',
        fontFamily: 'RobotoRegular',
    },
    name: {
        fontSize: '16px',
      },
}));

type MenuItemType = {    
    notificationItem: NotificationModel
  };

const DropdownItem: React.FC<MenuItemType> = ({ notificationItem }) => {
    const classes = useStyles();
    return (
        <div className={classes.cartItem}>         
           <div className={classes.itemDetails}>
               <span className='name'>{notificationItem.Email}</span>
               <span className='name'>{notificationItem.Subject}</span>
           </div>
        </div>
    )
};

export default DropdownItem;