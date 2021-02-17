import React from 'react';
import { makeStyles } from "@material-ui/core";
import NotificationModel from "../models/Notification";
import '../fonts/fonts.scss';
import '../fonts/font-main.scss';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SvgIcon from '@material-ui/core/SvgIcon';


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

// type MenuItemType = {
//     displayText: string;
//     MenuIcon: string 
// };

//const NavMenuItem: React.FC<MenuItemType> = ({ displayText, MenuIcon }) => {
const NavMenuItem = (props) => {
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

export default NavMenuItem;