import React from "react";

interface Props {
  viewBy: string;
}

const Filters: React.FC<Props> = (props) => {
  const ITEM = "Item";

  return (
    <div>
      {props.viewBy == ITEM && (
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
      )}
    </div>
  );
};

export default Filters;
