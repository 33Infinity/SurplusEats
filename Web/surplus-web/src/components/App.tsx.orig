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
<<<<<<< HEAD
import { connect } from 'react-redux';
import { authenticateCurrentUserAsync } from '../redux/user/user.actions';
import { addItem } from '../redux/cart/cart.actions';
import { useEffect } from 'react';
import ProfileModel from '../Models/ProfileModel';

type cartAndUser = {
  authenticateCurrentUserAsync: () => void,
  addItem: (item: {}) => void,
 // cartItems: []
}

const App: React.FC<cartAndUser> = ({authenticateCurrentUserAsync, addItem}) => {
=======
import { connect } from "react-redux";
import { setCurrentUser } from "../redux/user/user.actions";
import { addItem } from "../redux/cart/cart.actions";
import { useEffect } from "react";
import ProfileModel from "../models/ProfileModel";

type cartAndUser = {
  setCurrentUser: (user: ProfileModel) => void;
  addItem: (item: {}) => void;
  cartItems: [];
};
>>>>>>> 68e6830b863b550845c91cabcc477536c27b8cc2

const App: React.FC<cartAndUser> = ({ setCurrentUser, addItem, cartItems }) => {
  useEffect(() => {
    authenticateCurrentUserAsync();
    addItem({id: 1});
    setTimeout(() => {
<<<<<<< HEAD
      addItem({id: 2});
    }, 5000);    
  }, []);
=======
      //setCurrentUser(new ProfileModel("","","","Aaron","Flores","",true))
      addItem({ id: 1 });
    }, 7000);
  });
>>>>>>> 68e6830b863b550845c91cabcc477536c27b8cc2

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
};

<<<<<<< HEAD
// const mapStateToProps = ({cart: {cartItems}}) => ({
//   cartItems
// });

const mapDispatchToProps = dispatch => ({
  authenticateCurrentUserAsync: () => dispatch(authenticateCurrentUserAsync()),
  addItem: item => dispatch(addItem(item))
=======
const mapStateToProps = ({ cart: { cartItems } }) => ({
  cartItems,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  addItem: (item) => dispatch(addItem(item)),
>>>>>>> 68e6830b863b550845c91cabcc477536c27b8cc2
});

export default connect(null, mapDispatchToProps)(App);
