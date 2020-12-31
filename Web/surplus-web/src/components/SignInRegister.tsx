import React from "react";
import Header from "./Header";
import Register from './Register';
import SignIn from './SignIn';
import { Route, Switch } from "react-router-dom";
import {
  makeStyles, createStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => createStyles({
  container: {    
   display: "flex"    
  },
  child: {
   flex: 1   
  }  
}));

const SignInRegister: React.FC = () => {
    const classes = useStyles();
    return (
        <>
          <Header />
          <div className={classes.container}>


            <div className={classes.child}>
            <Switch>
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/register" component={Register} />
            </Switch>
            </div>    



          </div>
        </>
    )
};

export default SignInRegister;