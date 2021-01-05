import React from "react";
import SessionContext from "../SessionContext";
import CurrentSession from "../CurrentSession";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/App.css";
import "../css/ShoppingCart.css";
import Home from "./Home";
import Profile from "./Profile";
import SignIn from "./SignIn";
import Register from "./Register";
import VendorInventory from "./VendorInventory";
import Footer from "./Footer";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../redux/user/user.actions";
import { useEffect } from "react";
import ProfileModel from "../models/Profile";
import { auth } from "../firebase/firebase.utils";

type User = {
  currentUser: ProfileModel;
  setCurrentUser: (user: ProfileModel) => void;
};

const App: React.FC<User> = ({ currentUser, setCurrentUser }) => {
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      setCurrentUser(
        ProfileModel.NewNonVendor(
          "",
          user?.email,
          "",
          user?.displayName,
          "",
          "",
          true,
          user !== null ? true : false
        )
      );
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  return (
    <SessionContext.Provider value={CurrentSession}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Profile" component={Profile} />
            <Route exact path="/Signin"  render={() => 
              currentUser?.Authenticated ? <Home /> : <SignIn />} />
            <Route exact path="/Register"  render={() => 
              currentUser?.Authenticated ? <Home /> : <Register />} />
            <Route exact path="/VendorInventory" component={VendorInventory} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </SessionContext.Provider>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser  
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
