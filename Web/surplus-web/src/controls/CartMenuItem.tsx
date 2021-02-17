import React from 'react';
import { makeStyles } from "@material-ui/core";
import CartModel from "../models/Cart";
import '../fonts/fonts.scss';
import '../fonts/font-main.scss';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { AlarmOnOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    Item: {
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

const CartMenuItem = (props) => {
    const classes = useStyles();   
    return (
        <ListItem button className={classes.Item}>
            <ListItemIcon className={classes.icon}>
               {props.MenuIcon}
            </ListItemIcon>
            <span className={classes.itemDetails}>{props.displayText}</span>                       
        </ListItem>
    )
};

export default CartMenuItem;