import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Block } from 'projects/project/src/app/shared/models/block.model';
import { Game } from 'projects/project/src/app/shared/models/game.model';
import { Line } from 'projects/project/src/app/shared/models/line.model';
import { NotificationService } from 'projects/project/src/app/shared/services/notification.service';
import { Observable } from 'rxjs';
import { GamesFacade } from '../../../games/store/games.facade';
import { UsersFacade } from '../../../user/store/user.facade';

@Component({
  selector: 'app-game-play-start-container',
  templateUrl: './game-play-start-container.component.html',
  styleUrls: ['./game-play-start-container.component.scss'],
})
export class GamePlayStartContainerComponent implements OnInit {
  selectedGame: Game;
  startBlock: Block;
  blocks: Block[] = [];
  loading: Observable<boolean> = this.usersFacade.loading$;

  constructor(
    private gamesFacade: GamesFacade,
    private usersFacade: UsersFacade,
    private notificationService: NotificationService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.gamesFacade.selectedGame$.subscribe((game: Game) => {
      this.selectedGame = { ...game };
      this.startBlock = { ...game?.blocks[0] };
      this.getAnswers();
    });
  }

  onSubmit(block: Block): void {
    this.startBlock = { ...block };
    block.end ? (this.blocks = []) : this.getAnswers();
  }

  getAnswers(): void {
    this.blocks = [];
    this.selectedGame.blocks?.forEach((block: Block) => {
      this.startBlock.answers?.forEach((answer: Line) => {
        block.answerConnect?.idLine2 === answer?.idLine1
          ? this.blocks.push(block)
          : null;
      });
    });
  }

  onEndBack(achLink: string): void {
    this.usersFacade.saveUser({ achievements: [achLink] });
    this.notificationService.showInfo(
      'Osiągnięcie zostało dodane do Twojego profilu!',
      'Informacja'
    );
    this.location.back();
  }

  onBack(): void {
    this.location.back();
  }
}
