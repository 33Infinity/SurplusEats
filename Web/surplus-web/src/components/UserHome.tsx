import React from "react";
import Filters from "./Filters";
import UserInventory from "./UserInventory";

const UserHome: React.FC = () => {
  return (
    <div>
      <div className="container-fluid">
        <h1>Test</h1>
        <div className="row">
          <div className="col-2">
            <Filters />
          </div>
          <div className="col-8">
            <UserInventory />
          </div>
          <div className="col-2">Column3</div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
