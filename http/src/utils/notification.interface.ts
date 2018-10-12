export enum NotificationTypes {
  INFO, SUCCESS, ERROR, WARNING
}

export abstract class AINotificationsService {
  public abstract showAlert(title: string, message: string, type: NotificationTypes): void;

  public abstract showAlerts(values: { [name: string]: string[] }, type: NotificationTypes): void;

  public abstract clear(): void;
}
