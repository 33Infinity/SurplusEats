import React from "react";
import SessionContext from "../SessionContext";
import CurrentSession from "../CurrentSession";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/App.css";
import "../css/ShoppingCart.css";
import Home from "./Home";
import Profile from "./Profile";
import Footer from "./Footer";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <SessionContext.Provider value={CurrentSession}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </SessionContext.Provider>
  );
}

export default App;
