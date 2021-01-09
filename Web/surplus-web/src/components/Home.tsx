import React from "react";
import Header from "./Header";
import VendorHome from "./VendorHome";
import UserHome from "./UserHome";

const Home: React.FC = () => {
  const isVendor = false; //TODO: need to determine if user is logged in vendor via redux

  return (
    <div>
      <Header />
      {isVendor ? <VendorHome VendorId="DF7RY2YtfFonTNIotj32" /> : <UserHome />}
    </div>
  );
};

export default Home;
