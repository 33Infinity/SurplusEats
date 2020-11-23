import React from "react";
import Filters from "./Filters";

export default class Home extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Filters />
          </div>
          <div className="col-8">Column2</div>
          <div className="col-2">Column3</div>
        </div>
      </div>
    );
  }
}
