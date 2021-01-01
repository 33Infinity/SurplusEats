import React from "react";
import VendorInventory from "./VendorInventory";

const VendorHome: React.FC = () => {
  return (
    <div>
      <div className="container-fluid">
        <h1>Test</h1>
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <VendorInventory
              VendorId="DF7RY2YtfFonTNIotj32"
              LocationId="rFj5ZFeMvn32mlP48fXG"
            />
          </div>
          <div className="col-2">Column3</div>
        </div>
      </div>
    </div>
  );
};

export default VendorHome;
