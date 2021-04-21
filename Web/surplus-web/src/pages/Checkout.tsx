import React from "react";
import { connect } from "react-redux";
import { selectCartItems } from "../redux/cart/cart.selectors";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Grid, TextField } from "@material-ui/core";

const Checkout: React.FC = () => {
  return (
    <>
      <h1>Checkout Page</h1>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2} direction="row">
            <Grid item xs={12} sm={6}>
              <TextField>{/*  {`$${inventory?.Price}`} */}</TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  cartItems: selectCartItems(state),
});

export default connect(mapStateToProps)(Checkout);
