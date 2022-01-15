import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Game } from 'projects/project/src/app/shared/models/game.model';
import { User } from 'projects/project/src/app/shared/models/user.model';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { GamesFacade } from '../../../games/store/games.facade';
import { UsersFacade } from '../../../user/store/user.facade';

@Component({
  selector: 'app-custom-home-container',
  templateUrl: './custom-home-container.component.html',
  styleUrls: ['./custom-home-container.component.scss'],
})
export class CustomHomeContainerComponent implements OnInit, OnDestroy {
  games$: Observable<MatTableDataSource<Game>> = this.gamesFacade.games$.pipe(
    map((games) => {
      this._games = [];
      games.forEach((game) => {
        this.user?.games?.forEach((gameInfo) => {
          if (game.name === gameInfo.name && game.date === gameInfo.date) {
            this._games.push(game);
          }
        });
      });
      return new MatTableDataSource<Game>(this._games);
    })
  );

  _games: Game[] = [];
  user$: Observable<User> = this.usersFacade.user$;
  user: User;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private usersFacade: UsersFacade,
    private gamesFacade: GamesFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usersFacade.loadUser();
    this.gamesFacade.loadGames();
    this.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.user = user;
    });
  }

  onStart(game: Game): void {
    this.gamesFacade.upsertSelectedGame(game);
    this.router.navigate(['/play']);
  }

  onBack(): void {
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
