import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

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
  imageUrl: string | undefined;
  title: string | undefined;
  text: string | undefined;
  price: number | undefined;
}

const MediaCard: React.FC<Props> = (props) => {
  const classes = useStyles();
  function onClick() {
    alert("clicked");
  }
  return (
    <Card className={classes.root} variant="outlined" onClick={onClick}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Grid container spacing={2} direction="row">
            <Grid item xs={12} sm={6}>
              {props.price && (
                <Typography component="h6" variant="h6">
                  {"$" + props.price}
                </Typography>
              )}
              <Typography component="h5" variant="h5">
                {props.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {props.text}
              </Typography>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <Typography>(888)-888-9999</Typography>
              <Typography>Address Goes Here</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img src={props.imageUrl} className={classes.image}></img>
            </Grid>
          </Grid>
        </CardContent>
      </div>
    </Card>
  );
};

export default MediaCard;
