import React from "react";
import SessionContext from "../SessionContext";
import CurrentSession from "../CurrentSession";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/App.css";
import "../css/ShoppingCart.css";
import Home from "./Home";
import Profile from "./Profile";
import Register from "./Register";
import Footer from "./Footer";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { setCurrentUser } from '../redux/user/user.actions';
import { useEffect } from 'react';
import ProfileModel from '../Models/ProfileModel';

type currentUser = {
  setCurrentUser: (user: ProfileModel) => void
}

const App: React.FC<currentUser> = ({setCurrentUser}) => {

  useEffect(() => {
    setTimeout(() => {
      setCurrentUser(new ProfileModel("","","","Aaron","Flores","",true))
    }, 7000)
  })

  return (
    <SessionContext.Provider value={CurrentSession}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </SessionContext.Provider>
  );
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
