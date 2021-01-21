import React from 'react';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    cartItem: {
        width: '100%',
        display: 'flex',
        height: '80px',
        marginBottom: '15px',
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
        padding: '10px 20px',
    },
    name: {
        fontSize: '16px',
      },
}));

const DropdownItem = () => {
    const classes = useStyles();
    return (
        <div className={classes.cartItem}>
           <img src="arrow.svg" alt='item' />
           <div className={classes.itemDetails}>
               <span className='name'>name</span>
               <span className='name'>price</span>
           </div>
        </div>
    )
};

export default DropdownItem;