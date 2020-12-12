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
import { connect } from "react-redux";
import { authenticateCurrentUserAsync } from "../redux/user/user.actions";
import { addItem } from "../redux/cart/cart.actions";
import { useEffect } from "react";
import ProfileModel from "../models/ProfileModel";

type cartAndUser = {
  authenticateCurrentUserAsync: () => void;
  addItem: (item: {}) => void;
  // cartItems: []
};

const App: React.FC<cartAndUser> = ({
  authenticateCurrentUserAsync,
  addItem,
}) => {
  useEffect(() => {
    authenticateCurrentUserAsync();
    addItem({ id: 1 });
    setTimeout(() => {
      addItem({ id: 2 });
    }, 5000);
  }, []);

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

// const mapStateToProps = ({cart: {cartItems}}) => ({
//   cartItems
// });

const mapDispatchToProps = (dispatch) => ({
  authenticateCurrentUserAsync: () => dispatch(authenticateCurrentUserAsync()),
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(App);
