import NotificationRequest from "../requests/Notification";
import NotificationModel from "../models/Notification";
import ErrorModel from "../models/Error";
import BaseService from "./BaseService";

export default class Notification extends BaseService {
  static async add(aNotificationModel) {
    const json = await NotificationRequest.add(aNotificationModel);
    return this.isApiError(json);
  }

  static async delete(aNotificationId) {
    const json = await NotificationRequest.delete(aNotificationId);
    return this.isApiError(json);
  }

  static async getByEmail(anEmail): Promise<NotificationModel[] | ErrorModel> {
    const json = await NotificationRequest.getByEmail(anEmail);
    if (json == null) return [];
    return !this.isApiError(json)
      ? json.length > 0
        ? this.buildNotificationModels(json)
        : []
      : ErrorModel.NewError(json.ErrorMessage);
  }

  static async markAllAsRead(
    anEmail
  ): Promise<NotificationModel[] | ErrorModel> {
    const json = await NotificationRequest.markAllAsRead(anEmail);
    if (json == null) return [];
    return !this.isApiError(json)
      ? json.length > 0
        ? this.buildNotificationModels(json)
        : []
      : ErrorModel.NewError(json.ErrorMessage);
  }

  static async update(aNotificationModel) {
    const json = await NotificationRequest.update(aNotificationModel);
    return this.isApiError(json);
  }

  static buildNotificationModels(someJson) {
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
