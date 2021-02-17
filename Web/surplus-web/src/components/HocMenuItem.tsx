import React from 'react';
import { AlarmOnOutlined } from '@material-ui/icons';
import NotificationModel from "../models/Notification";

function withMenuItem(Component) {

  return function WihMenuItemComponent({ item, ...props }) {
    const displayText = item instanceof NotificationModel ? item.Subject : "";
    const icon = item instanceof NotificationModel ? <AlarmOnOutlined /> : <AlarmOnOutlined />;

    return <Component displayText={displayText} MenuIcon={icon} />
  };

}

export default withMenuItem;