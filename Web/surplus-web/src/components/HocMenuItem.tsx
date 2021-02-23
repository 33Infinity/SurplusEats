import React from 'react';
import { AlarmOnOutlined, AddShoppingCart } from '@material-ui/icons';
import NotificationModel from "../models/Notification";

function withMenuItem(Component) {

  return function WihMenuItemComponent({ item, ...props }) {
    const displayText = item instanceof NotificationModel ? item.Subject : item.InventoryId;
    const icon = item instanceof NotificationModel ? <AlarmOnOutlined /> : <AddShoppingCart />;

    return <Component displayText={displayText} MenuIcon={icon} {...props} />
  };

}

export default withMenuItem;