import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

interface Props {
  quantity: number;
  cartAdd(amount: number): any;
}

const CartPlusMinus: React.FC<Props> = (props) => {
  function handleIncrement() {
    props.cartAdd(props.quantity + 1);
  }
  function handleDecrement() {
    props.cartAdd(props.quantity - 1);
  }
  return (
    <>
      {/* <h1>{"Add To Cart"}</h1> */}
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button onClick={handleIncrement}>+</Button>
        {<Button disabled>{props.quantity}</Button>}
        {<Button onClick={handleDecrement}>-</Button>}
      </ButtonGroup>
    </>
  );
};

export default CartPlusMinus;
