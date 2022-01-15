import { CdkDragEnd } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Block } from 'projects/project/src/app/shared/models/block.model';

@Component({
  selector: 'app-create-main-presenter',
  templateUrl: './create-main-presenter.component.html',
  styleUrls: ['./create-main-presenter.component.scss'],
})
export class CreateMainPresenterComponent {
  @ViewChild('scene', { static: false }) scene: ElementRef<HTMLElement>;
  @ViewChild('border', { static: false }) border: ElementRef<HTMLElement>;
  @ViewChildren('circlesRender') circlesRender: QueryList<ElementRef>;
  @ViewChildren('box') box: QueryList<ElementRef>;
  @Output() back = new EventEmitter<void>();
  @Output() onAddBlock = new EventEmitter<void>();
  @Output() onAddEnd = new EventEmitter<void>();
  @Output() onAddStart = new EventEmitter<void>();
  @Output() onDeleteBlock = new EventEmitter<Block>();
  @Output() saveEdit = new EventEmitter<Block>();
  @Output() saveBlock = new EventEmitter<[Block, Block]>();
  @Output() drawLine = new EventEmitter<[any, Block]>();
  @Output() leaderLinePosition = new EventEmitter<void>();
  @Output() color = new EventEmitter<void>();
  @Output() save = new EventEmitter<string>();
  @Output() notification = new EventEmitter<void>();
  @Input() loading: boolean;
  @Input() blocks: Block[];

  saveMode = false;
  editMode = false;
  editingBlock: Block = {};
  startBoolean = true;
  zoomScale = 1;
  mouseDown = false;
  firstEvent = false;
  firstPostionX = 0;
  firstPostionY = 0;
  draggingStart = false;

  getColor(): void {
    this.color.emit();
  }

  onDrawLine(event, block: Block): void {
    this.drawLine.emit([event, block]);
  }

  @HostListener('wheel', ['$event']) onMouseWheel(
    eventWheel: WheelEvent
  ): void {
    if (eventWheel.deltaY < 0 && this.zoomScale < 2) {
      this.zoomScale = this.zoomScale + 0.1;
      this.scene.nativeElement.style.transform =
        'scale(' + this.zoomScale + ', ' + this.zoomScale + ')';
      this.border.nativeElement.style.transform =
        'scale(' + this.zoomScale + ', ' + this.zoomScale + ')';
      this.box.forEach((item) => {
        item.nativeElement.style.transform =
          'scale(' + this.zoomScale + ', ' + this.zoomScale + ')';
      });
    } else if (eventWheel.deltaY > 0 && this.zoomScale > 0.8) {
      this.zoomScale = this.zoomScale - 0.1;
      this.border.nativeElement.style.transform =
        'scale(' + this.zoomScale + ', ' + this.zoomScale + ')';
      this.scene.nativeElement.style.transform =
        'scale(' + this.zoomScale + ', ' + this.zoomScale + ')';
      this.box.forEach((item) => {
        item.nativeElement.style.transform =
          'scale(' + this.zoomScale + ', ' + this.zoomScale + ')';
      });
    }
    this.scene.nativeElement.style.left = `auto`;
    this.scene.nativeElement.style.top = `auto`;
    this.leaderLinePosition.emit();
  }

  onMouseUp(): void {
    this.mouseDown = false;
  }

  onMouseDown(): void {
    this.mouseDown = true;
    this.firstEvent = true;
  }

  onMouseMove(eventMove: MouseEvent, event: any): void {
    if (this.mouseDown) {
      if (this.firstEvent) {
        this.firstEvent = false;
        this.firstPostionX = eventMove.clientX;
        this.firstPostionY = eventMove.clientY;
      }
      if (!this.draggingStart) {
        if (
          eventMove.offsetX <= 100 ||
          eventMove.offsetX >= 2900 ||
          eventMove.offsetY <= 100 ||
          eventMove.offsetY >= 2900
        ) {
          this.mouseDown = false;
        } else {
          this.scene.nativeElement.style.left = `${
            event.target.offsetParent.offsetLeft +
            (this.firstPostionX - eventMove.clientX) / 150
          }px`;
          this.scene.nativeElement.style.top = `${
            event.target.offsetParent.offsetTop +
            (this.firstPostionY - eventMove.clientY) / 150
          }px`;
        }
      }
      this.leaderLinePosition.emit();
    }
  }

  addStart(): void {
    this.onAddStart.emit();
  }

  addBlock(): void {
    this.onAddBlock.emit();
  }

  addEnd(): void {
    this.onAddEnd.emit();
  }

  editBlock(id: string): void {
    this.editMode = true;
    this.blocks.filter((block) => {
      if (block.id === id) {
        this.editingBlock = { ...block };
      }
    });
  }

  deleteBlock(block: Block): void {
    this.onDeleteBlock.emit(block);
  }

  onSave(name: string): void {
    this.save.emit(name);
    this.saveMode = false;
  }

  saveEditing(block: Block): void {
    this.editMode = false;
    this.saveBlock.emit([block, this.editingBlock]);
    this.notification.emit();
  }

  dragStart(): void {
    this.draggingStart = true;
  }

  dragMoved(): void {
    this.leaderLinePosition.emit();
  }

  getPostionStart($event: CdkDragEnd, id: string): void {
    let { offsetLeft, offsetTop } = $event.source.element.nativeElement;
    let { x, y } = $event.distance;
    let temporaryBlock: Block;
    if (offsetLeft + x > 2800) {
      offsetLeft = 1290;
      x = 1500;
    }
    if (offsetTop + y > 2850) {
      offsetTop = 1340;
      y = 1500;
    }
    this.blocks.forEach((block) => {
      block.id === id
        ? (temporaryBlock = {
            ...block,
            relativeX: offsetLeft + x,
            relativeY: offsetTop + y,
          })
        : null;
    });
    this.saveEdit.emit(temporaryBlock);
    this.draggingStart = false;
  }

  onBack(): void {
    this.back.emit();
  }
}
