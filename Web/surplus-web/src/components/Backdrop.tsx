import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,      
      backgroundColor: 'rgba(0, 0, 0, 0.8)',      
    },
  }));

  type IsLoading = {
    isLoading: boolean;
    isInvisible: boolean  
  }

  const BackDrop: React.FC<Partial<IsLoading>> = ({isLoading = false, isInvisible = false}) => {
    const classes = useStyles();  
    return (
        <Backdrop className={classes.backdrop} open={isLoading} invisible={isInvisible}>
            <CircularProgress style={{'color': 'yellow'}} />
        </Backdrop>
    )
  };

  export default BackDrop;