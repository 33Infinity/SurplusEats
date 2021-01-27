import React, { RefObject } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import MainMenu from "./MainMenu";
import { ShoppingCart } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ProfileModel from "../models/Profile";
import { selectCartItemsCount } from "../redux/cart/cart.selectors";
import { auth } from "../firebase/firebase.utils";
import DropdownMenu from "../controls/DropdownMenu";
import HeaderEventType from "../utils/Enum";

const useStyles = makeStyles((theme: any) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

type NavInfo = {
  currentUser: ProfileModel;
  cartItemCount: number;
};

const NavBarMain: React.FC<NavInfo> = ({ currentUser, cartItemCount }) => {
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  let wrapperRef = React.useRef<HTMLDivElement>(null);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [profileEl, setProfileEl] = React.useState(null);
  const [showDialog, setShowDialog] = React.useState(false);
  const [dialogType, setDialogType] = React.useState(
    HeaderEventType.IsNotification |
      HeaderEventType.IsMail |
      HeaderEventType.IsCart
  );

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileClick = (event) => {
    setShowDialog(false);
    setProfileEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileEl(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  const SetDialogType = (type: HeaderEventType) => {
    setDialogType(type);
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShowDialog(false);
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <nav>
          <Link to="/profile">
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </Link>
        </nav>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <MainMenu />
          <Typography className={classes.title} variant="h6" noWrap>
            <nav>
              <Link to="/" className="white-link">
                Surplus Eats
              </Link>
            </nav>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon
                  onClick={() => {
                    SetDialogType(HeaderEventType.IsMail);
                    toggleDialog();
                  }}
                />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge color="secondary">
                <NotificationsIcon
                  onClick={() => {
                    SetDialogType(HeaderEventType.IsNotification);
                    toggleDialog();
                  }}
                />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="checkout"
              aria-haspopup="false"
              color="inherit"
            >
              <Badge badgeContent={cartItemCount} color="secondary">
                <ShoppingCart
                  onClick={() => {
                    SetDialogType(HeaderEventType.IsCart);
                    toggleDialog();
                  }}
                />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={handleProfileClick}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="fade-menu"
              anchorEl={profileEl}
              keepMounted
              open={Boolean(profileEl)}
              onClose={handleProfileClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              {currentUser?.IsAuthenticated ? (
                <>
                  <MenuItem onClick={handleProfileClose}>
                    <Link to="/profile">Profile</Link>
                  </MenuItem>
                  <MenuItem onClick={() => auth.signOut()}>
                    <Link to="/home">Log out</Link>
                  </MenuItem>
                </>
              ) : (
                <MenuItem onClick={handleProfileClose}>
                  <Link to="/signin">Sign in</Link>
                </MenuItem>
              )}
            </Menu>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {showDialog ? (
        <div ref={wrapperRef}>
          <DropdownMenu dropDownType={dialogType} btnEvent={toggleDialog} />
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  cartItemCount: selectCartItemsCount(state),
});

export default connect(mapStateToProps)(NavBarMain);
