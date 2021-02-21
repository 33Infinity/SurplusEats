import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import PhoneUtils from "../../utils/PhoneUtils";
import LocationModel from "../../models/Location";
import StringUtils from "../../utils/StringUtils";
import AddressUtils from "../../utils/AddressUtils";
import DefaultImage from "../../images/InventoryBlank.png";

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
  location: LocationModel;
}

const UserLocationItem: React.FC<Props> = ({ location }) => {
  const classes = useStyles();
  function navigateToLocationDetail() {
    window.location.href = `LocationDetail?LocationId=${location?.Id}&VendorId=${location.VendorModel.Id}`;
  }
  return (
    <Card
      className={classes.root}
      variant="outlined"
      onClick={navigateToLocationDetail}
    >
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Grid container spacing={2} direction="row">
            <Grid item xs={12} sm={6}>
              <Typography component="h5" variant="h5">
                {location.Name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {location.VendorModel.Description}
              </Typography>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <Typography>
                {PhoneUtils.format(location.PhoneArea, location.PhoneNumber)}
              </Typography>
              <Typography>
                {AddressUtils.format(
                  location.City,
                  location.State,
                  location.Address,
                  location.PostalCode
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img
                src={StringUtils.valueOrDefault(
                  location.VendorModel.ImageUrl,
                  DefaultImage
                )}
                className={classes.image}
              ></img>
            </Grid>
          </Grid>
        </CardContent>
      </div>
    </Card>
  );
};

export default UserLocationItem;
