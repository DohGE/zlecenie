import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home-main-presenter',
  templateUrl: './home-main-presenter.component.html',
  styleUrls: ['./home-main-presenter.component.scss'],
})
export class HomeMainPresenterComponent {
  @Output() logout = new EventEmitter<void>();

  onLogout(): void {
    this.logout.emit();
  }
}
