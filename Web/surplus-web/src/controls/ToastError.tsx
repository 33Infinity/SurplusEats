import React from "react";
import { makeStyles, createStyles, IconButton } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) =>
  createStyles({
    error: {
      backgroundColor: theme.palette.error.dark,
    },
  })
);

interface Props {
  showError: boolean;
  setShowError(hasError: boolean): any;
  errorMessage: string;
}

const ToastError: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        ContentProps={{
          classes: {
            root: classes.error,
          },
        }}
        open={props.showError}
        onClose={() => props.setShowError(false)}
        message={props.errorMessage}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => props.setShowError(false)}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </>
  );
};

export default ToastError;
