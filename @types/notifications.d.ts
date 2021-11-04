type NotificationType =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'light'
  | 'dark'
  | 'success'
  | 'warning';

interface NotificationPayload {
  type: NotificationType;
  heading?: string;
  message: string | string[];
}

interface NotificationMessage extends NotificationPayload {
  id: string;
}

type NotificationState = NotificationMessage[];
