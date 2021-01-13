import React from "react";
import VendorHome from "./VendorHome";
import UserHome from "./UserHome";

const Home: React.FC = () => {
  const isVendor = true; //TODO: need to determine if user is logged in vendor via redux

  return (
    <div>     
      {isVendor ? <VendorHome VendorId="DF7RY2YtfFonTNIotj32" /> : <UserHome />}
    </div>
  );
};

export default Home;
