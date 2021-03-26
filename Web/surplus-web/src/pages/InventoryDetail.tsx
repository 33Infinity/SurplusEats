import React, { useEffect, useState } from "react";
import HttpHelper from "../utils/HttpHelper";
import InventoryService from "../services/Inventory";
import InventoryModel from "../models/Inventory";
import ErrorModel from "../models/Error";
import { confirmWithSingleButton } from "../controls/Confirmation";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 650,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


const InventoryDetail: React.FC = () => {
  useEffect(() => {
    getInventory();
  }, []);
  const [inventory, setInventory] = useState<InventoryModel>();
  const [expanded, setExpanded] = useState(false);  

  async function getInventory() {
    const inventoryId = HttpHelper.getUrlParamValue("InventoryId");
    const foundInventory = await InventoryService.getById(inventoryId);
    if (foundInventory instanceof InventoryModel) {
      setInventory(foundInventory);
    }
    if (foundInventory instanceof ErrorModel) {
      confirmWithSingleButton(
        "Ok",
        "Error",
        foundInventory.ErrorMessage,
        navigateBackToSignIn
      );
    }
  }

  function navigateBackToSignIn() {
    window.location.href = "Home";
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const classes = useStyles();
  return (    
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            SE
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={inventory?.Name}
        subheader={inventory?.Description}        
      />
       <CardMedia
        className={classes.media}
        image={inventory?.ImageUrl}
        title="Paella dish"
      />
       <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
         Price: ${inventory?.Price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to cart">
          <AddShoppingCartIcon />
        </IconButton>        
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>          
          <Typography paragraph>
            {inventory?.LocationModel.Name} 
          </Typography>         
          <Typography paragraph>
            {inventory?.LocationModel.Address}, {inventory?.LocationModel.City}, {inventory?.LocationModel.State} {inventory?.LocationModel.PostalCode} 
          </Typography>
          <Typography paragraph>
            Phone Number
          </Typography>
          <Typography paragraph>
            {inventory?.LocationModel.PhoneNumber}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
   
  );
};

export default InventoryDetail;
