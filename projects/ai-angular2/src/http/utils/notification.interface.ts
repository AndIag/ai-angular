export enum NotificationTypes {
  INFO, SUCCESS, ERROR, WARNING
}

export interface AINotificationsService {
  showAlert(title: string, message: string, type: NotificationTypes): void;

  showAlerts(values: { [name: string]: string[] }, type: NotificationTypes): void;
}
