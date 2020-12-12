import React from "react";

const Filters: React.FC = () => {
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
};

export default Filters;
