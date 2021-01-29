import NotificationRequest from "../requests/Notification";
import NotificationModel from "../models/Notification";
import ErrorModel from "../models/Error";
import BaseService from "./BaseService";

export default class Notification extends BaseService {
  async getByEmail(anEmail): Promise<NotificationModel[] | ErrorModel> {
    const request = new NotificationRequest();
    const json = await request.getByEmail(anEmail);
    return this.isApiError(json)
      ? json.length > 0
        ? this.buildNotificationModels(json)
        : []
      : ErrorModel.NewError(json.ErrorMessage);
  }

  buildNotificationModels(someJson) {
    const notificationModels: NotificationModel[] = [];
    for (let i = 0; i < someJson.length; i++) {
      notificationModels.push(
        NotificationModel.NewNotification(
          someJson[i].NotificationId,
          someJson[i].Email,
          someJson[i].Subject,
          someJson[i].Message,
          someJson[i].MarkedAsRead,
          someJson[i].Id,
          someJson[i].CreatedDate
        )
      );
    }
    return notificationModels;
  }
}
