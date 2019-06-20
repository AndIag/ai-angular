export enum NotificationTypes {
  INFO, SUCCESS, ERROR, WARNING,
}

export abstract class AINotificationsService {
  abstract showAlert(title: string, message: string, type: NotificationTypes): void;

  abstract showAlerts(values: { [name: string]: string[] }, type: NotificationTypes): void;

  abstract clear(): void;
}
