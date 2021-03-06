import * as React from "react";
import {
  Button,
  IconButton,
  Tooltip,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  faceImage: {
    color: theme.palette.primary.light,
  },
}));

interface Props {
  onSelectedFile(name: any): any;
  buttonText: string;
}

export const ImageUpload: React.FunctionComponent<Props> = ({
  onSelectedFile,
  buttonText,
}) => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = React.useState("");
  const handleCapture = ({ target }: any) => {
    setSelectedFile(target.files[0]);
    onSelectedFile(target.files[0]);
  };

  return (
    <>
      <input
        accept="image/jpg"
        className={classes.input}
        id="faceImage"
        type="file"
        onChange={handleCapture}
      />
      <img src={selectedFile != null ? selectedFile : ""} />
      <Tooltip title="Select Image">
        <label htmlFor="faceImage">
          <IconButton
            className={classes.faceImage}
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera fontSize="large" />
          </IconButton>
        </label>
      </Tooltip>
    </>
  );
};

export default ImageUpload;
