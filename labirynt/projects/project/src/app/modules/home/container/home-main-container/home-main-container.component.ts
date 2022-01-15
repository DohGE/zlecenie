import { Component } from '@angular/core';
import { AuthFacade } from '../../../auth/store/auth.facade';

@Component({
  selector: 'app-home-main-container',
  templateUrl: './home-main-container.component.html',
  styleUrls: ['./home-main-container.component.scss'],
})
export class HomeMainContainerComponent {
  constructor(private authFacade: AuthFacade) {}

  logout(): void {
    this.authFacade.logout();
  }
}
