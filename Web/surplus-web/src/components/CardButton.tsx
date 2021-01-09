import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

interface Props {
  imagePath: string;
  height: string;
  text: string;
}

const CardButton: React.FC<Props> = (props) => {
  const classes = useStyles();
  function onClick() {
    alert("clicked");
  }
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          height={props.height}
          image={props.imagePath}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardButton;
