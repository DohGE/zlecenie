import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Block } from 'projects/project/src/app/shared/models/block.model';

@Component({
  selector: 'app-game-play-start-presenter',
  templateUrl: './game-play-start-presenter.component.html',
  styleUrls: ['./game-play-start-presenter.component.scss'],
})
export class GamePlayStartPresenterComponent {
  @Output() submit = new EventEmitter<Block>();
  @Output() back = new EventEmitter<void>();
  @Output() endBack = new EventEmitter<string>();
  @Input() blocks: Block[];
  @Input() loading: boolean;
  @Input() public set startBlock(start: Block) {
    this._startBlock = start;
    this.background = start?.link;
  }
  public get startBlock(): Block {
    return this._startBlock;
  }
  private _startBlock: Block;
  background: string;

  onSubmit(block: Block): void {
    this.submit.emit(block);
  }

  onEndBack(achLink: string): void {
    this.endBack.emit(achLink);
  }

  onBack(): void {
    this.back.emit();
  }
}
