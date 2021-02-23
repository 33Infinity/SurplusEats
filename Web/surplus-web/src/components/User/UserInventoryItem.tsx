import React from "react";
import InventoryModel from "../../models/Inventory";
import DefaultImage from "../../images/InventoryBlank.png";
import StringUtils from "../../utils/StringUtils";
import { addItemAsync } from "../../redux/cart/cart.actions";
import { connect } from "react-redux";
import CartModel from "../../models/Cart";
import ProfileModel from "../../models/Profile";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: 151,
    },
    controls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    image: {
      height: "200px",
      width: "200px",
    },
  })
);

interface Props {
  inventory: (InventoryModel | undefined) | null;
  currentUser: ProfileModel;
  addItem: (cartItem: CartModel) => void;
}

const UserInventoryItem: React.FC<Props> = ({
  inventory,
  addItem,
  currentUser,
}) => {
  const classes = useStyles();
  function navigateToInventoryDetail() {
    window.location.href = `InventoryDetail?InventoryId=${inventory?.Id}`;
  }
  async function cartAdd(anAmount) {
    if (inventory instanceof InventoryModel) {
      const cartItem = CartModel.NewCart(
        inventory.Id,
        currentUser.Email,
        1,
        inventory.Price,
        inventory.ImageUrl,
        inventory.Description,
        false,
        null,
        new Date()
      );
      addItem(cartItem);
    }
  }
  return (
    <Card
      className={classes.root}
      variant="outlined"
      onClick={navigateToInventoryDetail}
    >
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Grid container spacing={2} direction="row">
            <Grid item xs={12} sm={6}>
              <Typography component="h5" variant="h5">
                {`$${inventory?.Price}`}
              </Typography>
              <Typography component="h5" variant="h5">
                {inventory?.LocationModel.VendorModel.Name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {inventory?.Name}
              </Typography>
              <Typography>{inventory?.Description}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img
                src={StringUtils.valueOrDefault(
                  inventory?.ImageUrl,
                  DefaultImage
                )}
                className={classes.image}
              ></img>
            </Grid>
          </Grid>
        </CardContent>
        <Button onClick={cartAdd}>Add To Cart</Button>
      </div>
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (cartItem) => dispatch(addItemAsync(cartItem)),
});

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInventoryItem);
