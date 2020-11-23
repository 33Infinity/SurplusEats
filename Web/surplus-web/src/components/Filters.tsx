import React from "react";

export default class Filters extends React.Component {
  render() {
    return (
      <div>
        <h5 className="mt-3">Price</h5>
        <div className="px-2">
          <input type="checkbox" checked={false} />
          <span> free</span>
        </div>
        <div className="px-2">
          <input type="checkbox" checked={false} />
          <span> less than $10</span>
        </div>
      </div>
    );
  }
}
