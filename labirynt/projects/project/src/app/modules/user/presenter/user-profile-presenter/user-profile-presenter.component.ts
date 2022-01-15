import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'projects/project/src/app/shared/models/user.model';

@Component({
  selector: 'app-user-profile-presenter',
  templateUrl: './user-profile-presenter.component.html',
  styleUrls: ['./user-profile-presenter.component.scss'],
})
export class UserProfilePresenterComponent {
  @Input() user: User;
  @Output() back = new EventEmitter<void>();

  onBack(): void {
    this.back.emit();
  }
}
