import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NotificationService } from '../core/core/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];
  userId: string = '';

  constructor(
    private notificationService: NotificationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const localUserId = localStorage.getItem('userId');
      if (localUserId) {
        this.userId = localUserId;
        this.notificationService
          .getNotifications(+this.userId)
          .subscribe((res) => {
            this.notifications = res;
          });
      }
    }
  }

  markAsRead(id: number) {
    this.notificationService.markAsRead(id).subscribe(() => {
      this.notifications = this.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
    });
  }
}
