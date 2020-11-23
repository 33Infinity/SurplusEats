import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/App.css";
import "../css/ShoppingCart.css";
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";

function App() {
  return (
    <div>
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
