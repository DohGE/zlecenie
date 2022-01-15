import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Block } from 'projects/project/src/app/shared/models/block.model';

@Component({
  selector: 'app-create-edit-presenter',
  templateUrl: './create-edit-presenter.component.html',
  styleUrls: ['./create-edit-presenter.component.scss'],
})
export class CreateEditPresenterComponent {
  @Input() public set editingBlock(value: Block) {
    this._editingBlock = value;
    if (!value.end) {
      this.form.controls.answers.addValidators(
        Validators.pattern('^([1-9]|10)$')
      );
    } else {
      this.form.controls.answers.removeValidators(
        Validators?.pattern('^([1-9]|10)$')
      );
    }
  }
  public get editingBlock(): Block {
    return this._editingBlock;
  }
  private _editingBlock: Block;

  @Output() back = new EventEmitter<void>();
  @Output() saveEditing = new EventEmitter<Block>();
  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    question: new FormControl(null, Validators.required),
    answers: new FormControl(null, Validators.required),
    link: new FormControl(null, Validators.required),
  });

  onBack(): void {
    this.back.emit();
  }

  onSave(): void {
    const newBlock: Block = { ...this.editingBlock };
    if (this.form.controls.name.value) {
      newBlock.name = this.form.controls.name.value;
    }
    if (this.form.controls.question.value) {
      newBlock.question = this.form.controls.question.value;
    }
    if (this.form.controls.link.value) {
      newBlock.link = this.form.controls.link.value;
    }
    if (!this.form.controls.answers.value && !newBlock.end) {
      newBlock.answers = [];
      this.editingBlock.answers?.forEach((answer) => {
        newBlock.answers.push(answer);
      });
    }
    if (this.editingBlock.end && this.form.controls.answers.value) {
      newBlock.achLink = this.form.controls.answers.value;
      newBlock.answers = [];
    } else if (this.editingBlock.answers && this.form.controls.answers.value) {
      newBlock.answers = [...this.editingBlock.answers];
      if (
        this.editingBlock.answers?.length < this.form.controls.answers.value
      ) {
        for (
          let i = this.editingBlock.answers.length;
          i < this.form.controls.answers.value;
          i++
        ) {
          newBlock.answers.push({ idLine1: '', idLine2: '' });
        }
      } else if (
        this.editingBlock.answers?.length > this.form.controls.answers.value
      ) {
        for (
          let i = this.editingBlock.answers.length - 1;
          i >= +this.form.controls.answers.value;
          i--
        ) {
          newBlock.answers.splice(i, 1);
        }
      }
    } else if (this.form.controls.answers.value) {
      newBlock.answers = [];
      for (let i = 1; i <= this.form.controls.answers.value; i++) {
        newBlock.answers.push({ idLine1: '', idLine2: '' });
      }
    }
    if (
      this.form.controls.name.valid ||
      this.form.controls.question.valid ||
      this.form.controls.answers.valid ||
      this.form.controls.link.valid
    ) {
      this.saveEditing.emit(newBlock);
    }
  }
}
