import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/App.css";
import "../css/ShoppingCart.css";
import "../css/ConfirmAlert.css";
import UserHome from "../pages/UserHome";
import VendorHome from "../pages/VendorHome";
import VendorProfile from "../pages/VendorProfile";
import UserProfile from "../pages/UserProfile";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";
import VendorInventory from "./Vendor/VendorInventory";
import Footer from "./Footer";
import {
  HashRouter as Router,
  Route,
  Switch,
  BrowserRouter,
} from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../redux/user/user.actions";
import { useEffect } from "react";
import ProfileModel from "../models/Profile";
import ErrorModel from "../models/Error";
import { auth } from "../firebase/firebase.utils";
import Header from "./Header";
import AuthenticationService from "../services/Authentication";

type User = {
  currentUser: ProfileModel;
  setCurrentUser: (user: ProfileModel) => void;
};

const App: React.FC<User> = ({ currentUser, setCurrentUser }) => {
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      const authenticationService = new AuthenticationService();
      if (user == null) {
        setCurrentUser(ProfileModel.EmptyProfile());
        return;
      }
      authenticationService.getProfile(user?.email).then((profile) => {
        if (profile instanceof ErrorModel) {
          setCurrentUser(ProfileModel.EmptyProfile());
          return;
        }
        if (profile instanceof ProfileModel) {
          setCurrentUser(profile);
        }
      });
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              currentUser?.IsAuthenticated ? (
                currentUser?.IsVendor ? (
                  <VendorHome />
                ) : (
                  <UserHome />
                )
              ) : (
                <SignIn />
              )
            }
          />
          <Route
            exact
            path="/Home"
            render={() =>
              currentUser?.IsAuthenticated ? (
                currentUser?.IsVendor ? (
                  <VendorHome />
                ) : (
                  <UserHome />
                )
              ) : (
                <SignIn />
              )
            }
          />
          <Route
            exact
            path="/Profile"
            render={() =>
              currentUser?.IsAuthenticated ? (
                currentUser?.IsVendor ? (
                  <VendorProfile />
                ) : (
                  <UserProfile />
                )
              ) : (
                <SignIn />
              )
            }
          />
          <Route
            exact
            path="/Signin"
            render={() =>
              currentUser?.IsAuthenticated ? (
                currentUser?.IsVendor ? (
                  <VendorHome />
                ) : (
                  <UserHome />
                )
              ) : (
                <SignIn />
              )
            }
          />
          <Route
            exact
            path="/Register"
            render={() =>
              currentUser?.IsAuthenticated ? (
                currentUser?.IsVendor ? (
                  <VendorHome />
                ) : (
                  <UserHome />
                )
              ) : (
                <Register />
              )
            }
          />
          <Route exact path="/VendorInventory" component={VendorInventory} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
