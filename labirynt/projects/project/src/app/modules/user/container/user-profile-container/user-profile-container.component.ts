import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../../../shared/models/user.model';
import { UsersFacade } from '../../store/user.facade';

@Component({
  selector: 'app-user-profile-container',
  templateUrl: './user-profile-container.component.html',
  styleUrls: ['./user-profile-container.component.scss'],
})
export class UserProfileContainerComponent implements OnInit {
  user: Observable<User> = this.usersFacade.user$;

  constructor(private usersFacade: UsersFacade, private router: Router) {}

  ngOnInit(): void {
    this.usersFacade.loadUser();
  }

  back(): void {
    this.router.navigate(['']);
  }
}
