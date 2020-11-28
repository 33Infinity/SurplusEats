import React from "react";
import Header from "./Header";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

export default class Profile extends React.Component {
  classes: any;
  useStyles: any;
  constructor(props: any) {
    super(props);
    this.classes = makeStyles((theme: Theme) =>
      createStyles({
        root: {
          flexGrow: 1,
        },
        paper: {
          padding: theme.spacing(2),
          textAlign: "left",
          color: theme.palette.text.secondary,
        },
      })
    );
  }

  render() {
    return (
      <div>
        <Header />
        <div className={this.classes.root}>
          <Grid container spacing={3}>
            <h1>Profile Page</h1>
            <Grid item xs={6}>
              <Paper className={this.classes.paper}>xs=6</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={this.classes.paper}>xs=6</Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
