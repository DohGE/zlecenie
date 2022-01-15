import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string, title: string): void {
    this.toastr.success(message, title);
  }

  showError(message: string, title: string): void {
    let options;
    message.includes('<br>')
      ? (options = {
          progressBar: true,
          enableHtml: true,
          disableTimeOut: true,
        })
      : null;
    this.toastr.error(message, title, options);
  }

  showInfo(message: string, title: string): void {
    this.toastr.info(message, title);
  }

  showWarning(message: string, title: string): void {
    this.toastr.warning(message, title);
  }
}
