import { Component } from '@angular/core';
import { NotificationService } from '../core/core/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  notifications: any[] = [];
  userId: number = +localStorage.getItem('userId')!;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getNotifications(this.userId).subscribe((res) => {
      this.notifications = res;
    });
  }

  markAsRead(id: number) {
    this.notificationService.markAsRead(id).subscribe(() => {
      this.notifications = this.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
    });
  }
}
