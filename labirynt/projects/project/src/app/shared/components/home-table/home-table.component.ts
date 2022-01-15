import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Game } from 'projects/project/src/app/shared/models/game.model';

@Component({
  selector: 'app-home-table',
  templateUrl: './home-table.component.html',
  styleUrls: ['./home-table.component.scss'],
})
export class HomeTableComponent {
  @Output() back = new EventEmitter<void>();
  @Output() start = new EventEmitter<Game>();
  @Input() public set games(gamesArray: MatTableDataSource<Game>) {
    this._games = gamesArray;
  }
  public get games(): MatTableDataSource<Game> {
    return this._games;
  }
  private _games: MatTableDataSource<Game>;

  displayedColumns: string[] = ['name', 'blocks', 'date'];

  onStart(game: Game): void {
    this.start.emit(game);
  }

  onBack(): void {
    this.back.emit();
  }
}
