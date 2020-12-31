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

interface MyClassProps {
  onSelectedFile(name: any): any;
}

export const ImageUpload: React.FunctionComponent<MyClassProps> = ({
  onSelectedFile,
}) => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = React.useState("");

  const handleCapture = ({ target }: any) => {
    const c = target.files[0];
    setSelectedFile(URL.createObjectURL(target.files[0]));
  };

  const handleSubmit = () => {
    // saveFace(selectedFile);
    onSelectedFile(selectedFile);
    //const file = selectedFile;
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
      <label>{selectedFile ? "test" : "Select Image"}</label>. . .
      <Button onClick={() => handleSubmit()} color="primary">
        Save
      </Button>
    </>
  );
};

export default ImageUpload;
