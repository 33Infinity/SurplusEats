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
import { auth } from "../firebase/firebase.utils";
import Header from "./Header";

type User = {
  currentUser: ProfileModel;
  setCurrentUser: (user: ProfileModel) => void
};

const App: React.FC<User> = ({ currentUser, setCurrentUser }) => {
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      setCurrentUser(
        ProfileModel.NewProfile(
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
      <BrowserRouter>
        <div>
        <Header />       
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Home" component={Home} />
            <Route
              exact
              path="/Profile"
              render={() =>
                currentUser?.IsAuthenticated ? <Profile /> : <SignIn />
              }
            />
            <Route
              exact
              path="/Signin"
              render={() =>
                currentUser?.IsAuthenticated ? <Home /> : <SignIn />
              }
            />
            <Route
              exact
              path="/Register"
              render={() =>
                currentUser?.IsAuthenticated ? <Home /> : <Register />
              }
            />
            <Route exact path="/VendorInventory" component={VendorInventory} />
          </Switch> 
          <Footer />
        </div>
      </BrowserRouter>
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
