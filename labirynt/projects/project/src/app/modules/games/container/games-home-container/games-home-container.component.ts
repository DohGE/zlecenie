import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Game } from 'projects/project/src/app/shared/models/game.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GamesFacade } from '../../store/games.facade';

@Component({
  selector: 'app-games-home-container',
  templateUrl: './games-home-container.component.html',
  styleUrls: ['./games-home-container.component.scss'],
})
export class GamesHomeContainerComponent implements OnInit {
  games$: Observable<MatTableDataSource<Game>> = this.gamesFacade.games$.pipe(
    map((games) => {
      return new MatTableDataSource<Game>(games);
    })
  );

  constructor(private gamesFacade: GamesFacade, private router: Router) {}

  ngOnInit(): void {
    this.gamesFacade.loadGames();
  }

  onStart(game: Game): void {
    this.gamesFacade.upsertSelectedGame(game);
    this.router.navigate(['/play']);
  }

  onBack(): void {
    this.router.navigate(['']);
  }
}
