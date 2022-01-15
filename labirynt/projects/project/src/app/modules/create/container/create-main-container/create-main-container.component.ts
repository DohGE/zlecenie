import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Block } from 'projects/project/src/app/shared/models/block.model';
import { NotificationService } from 'projects/project/src/app/shared/services/notification.service';
import * as uuid from 'uuid';
import { GamesFacade } from '../../../games/store/games.facade';
import 'leader-line';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { UsersFacade } from '../../../user/store/user.facade';
declare let LeaderLine: any;

@Component({
  selector: 'app-create-main-container',
  templateUrl: './create-main-container.component.html',
  styleUrls: ['./create-main-container.component.scss'],
})
export class CreateMainContainerComponent implements OnInit, OnDestroy {
  blocks: Block[];
  blocks$: Observable<Block[]> = this.gamesFacade.blocks$;
  loading$: Observable<boolean> = this.gamesFacade.loading$;
  destroy$: Subject<boolean> = new Subject<boolean>();
  startBoolean = true;
  editMode = false;
  zoomScale = 1;
  mouseDown = false;
  firstEvent = false;
  firstPostionX = 0;
  firstPostionY = 0;
  draggingStart = false;

  drawLineIndex = 0;
  drawLineBoolean = true;
  drawLineBlock: Block = null;
  drawLineTarget: string;
  LeaderLines: any[] = [];

  constructor(
    private router: Router,
    private gamesFacade: GamesFacade,
    private usersFacade: UsersFacade,
    private notificationService: NotificationService,
    @Inject(DOCUMENT) private document
  ) {}

  ngOnInit(): void {
    this.usersFacade.loadUser();
    this.gamesFacade.loadGames();
    this.gamesFacade.loadBlocks();
    this.reDrawLine();
    this.blocks$.pipe(takeUntil(this.destroy$)).subscribe((blocks: Block[]) => {
      if (blocks) {
        this.blocks = [...blocks];
        this.reDrawLine();
      }
    });
  }

  onNotification(): void {
    this.notificationService.showSuccess(
      'Pomyślnie zapisano informacje!',
      'Sukces'
    );
  }

  getColor(): void {
    this.blocks?.forEach((block) => {
      if (!block?.end && block?.answers?.length) {
        block.answers?.forEach((newAnswer) => {
          newAnswer?.idLine1 &&
          newAnswer?.idLine2 &&
          this.drawLineBoolean === true &&
          this.document.getElementById(newAnswer.idLine1)
            ? (this.document.getElementById(
                newAnswer.idLine1
              ).style.backgroundColor = 'gold')
            : null;
        });
        null;
      }
      if (
        block.answerConnect?.idLine1 &&
        block.answerConnect?.idLine2 &&
        this.drawLineBoolean === true &&
        this.document.getElementById(block.answerConnect.idLine1) &&
        this.document.getElementById(block.answerConnect.idLine2)
      ) {
        this.document.getElementById(
          block.answerConnect.idLine1
        ).style.backgroundColor = 'gold';
      }
    });
  }

  addStart(): void {
    this.gamesFacade.addBlock({
      id: uuid.v4(),
      end: false,
      start: true,
    });
  }

  addBlock(): void {
    this.gamesFacade.addBlock({
      id: uuid.v4(),
      end: false,
      start: false,
      answerConnect: { idLine1: '' },
    });
  }

  addEnd(): void {
    this.gamesFacade.addBlock({
      id: uuid.v4(),
      end: true,
      start: false,
      answerConnect: { idLine1: '' },
    });
  }

  deleteBlock(block: Block): void {
    let temporaryBlock: Block;
    this.blocks.forEach((newBlock) => {
      newBlock.answers?.forEach((answer, index) => {
        answer.idLine1 === block.answerConnect.idLine2
          ? ((temporaryBlock = {
              ...newBlock,
              answers: [...newBlock.answers],
            }),
            this.LeaderLines.forEach((leaderLine) => {
              leaderLine.end === block.answerConnect.idLine2 ||
              leaderLine.start === block.answerConnect.idLine2
                ? leaderLine.remove()
                : null;
            }),
            ((temporaryBlock.answers[index] = { idLine1: '', idLine2: '' }),
            this.saveEditing(temporaryBlock)))
          : null;
      });
      block.answers?.forEach((answer) => {
        answer.idLine1 === newBlock.answerConnect?.idLine2
          ? ((temporaryBlock = {
              ...newBlock,
              answerConnect: { idLine1: '', idLine2: '' },
            }),
            this.LeaderLines.forEach((leaderLine) => {
              leaderLine.end === block.answerConnect.idLine2 ||
              leaderLine.start === block.answerConnect.idLine2
                ? leaderLine.remove()
                : null;
            }),
            this.saveEditing(temporaryBlock))
          : null;
      });
    });
    this.gamesFacade.deleteBlock(block.id);
  }

  saveEditing(block: Block): void {
    this.gamesFacade.saveBlock(block);
  }

  saveBlock([newBlock, oldBlock]: [Block, Block]): void {
    const temporaryBlock: Block = { answers: [] };
    oldBlock?.answers?.forEach((oldAnswer) => {
      if (!newBlock?.answers?.includes(oldAnswer)) {
        temporaryBlock.answers.push(oldAnswer);
      }
    });
    this.blocks.forEach((block) => {
      temporaryBlock?.answers?.forEach((temporaryAnswer) => {
        if (block.answerConnect?.idLine2 === temporaryAnswer?.idLine1) {
          this.gamesFacade.saveBlock({
            ...block,
            answerConnect: { idLine1: '', idLine2: '' },
          });
        }
      });
    });
    this.gamesFacade.saveBlock(newBlock);
  }

  save(name: string): void {
    const errors: string[] = [];
    this.blocks.forEach((block, index) => {
      if (!block?.answers?.length && !block.end) {
        errors.push(
          `Błąd w bloku: ${
            index + 1
          } <br> Blok nie jest podłączony do bloku końcowego! <br><br>`
        );
      }
      block?.answers?.forEach((answer) => {
        answer.idLine1 && answer.idLine2
          ? null
          : errors.push(
              `Błąd w bloku: ${
                index + 1
              } <br> Odpowiedź nie posiada pytania! <br><br>`
            );
      });
      block?.answerConnect
        ? null
        : !block.start
        ? errors.push(
            `Błąd w bloku: ${
              index + 1
            } <br> Pytanie nie posiada odpowiedzi! <br><br>`
          )
        : null;

      block?.link
        ? null
        : errors.push(
            `Błąd w bloku: ${
              index + 1
            } <br> Blok nie posiada linku do tła! <br><br>`
          );
      block?.name
        ? null
        : block.start
        ? errors.push(
            `Błąd w bloku: ${
              index + 1
            } <br> Blok nie posiada notatki powitalnej! <br><br>`
          )
        : errors.push(
            `Błąd w bloku: ${
              index + 1
            } <br> Blok nie posiada odpowiedzi! <br><br>`
          );
      block?.question
        ? null
        : block.end
        ? errors.push(
            `Błąd w bloku: ${
              index + 1
            } <br> Blok nie posiada opisu końca gry! <br><br>`
          )
        : errors.push(
            `Błąd w bloku: ${index + 1} <br> Blok nie posiada pytania! <br><br>`
          );
      !block?.achLink && block.end
        ? errors.push(
            `Błąd w bloku: ${
              index + 1
            } <br> Blok nie posiada linku do osiągnięcia! <br><br>`
          )
        : null;
    });
    if (!errors.length) {
      this.gamesFacade.saveGame({
        name: name,
        date: moment().locale('pl').format('D MMMM YYYY, HH:mm:ss'),
        blocks: this.blocks,
      });
    } else {
      let message = '';
      errors.map((error) => {
        return (message = message + error);
      });
      this.notificationService.showError(`${message}`, 'Błąd!');
    }
  }

  back(): void {
    this.LeaderLines.forEach((leaderLine) => {
      leaderLine.remove();
    });
    this.router.navigate(['']);
  }

  reDrawLine(): void {
    setTimeout(() => {
      this.LeaderLines.forEach((leaderLine) => {
        leaderLine.remove();
      });
      this.LeaderLines = [];
      this.blocks.forEach((block) => {
        if (
          this.document.getElementById(block.answerConnect?.idLine1) &&
          this.document.getElementById(block.answerConnect?.idLine2)
        ) {
          if (this.document.getElementById(block.answerConnect.idLine2)) {
            this.LeaderLines.push(
              new LeaderLine(
                this.document.getElementById(block.answerConnect.idLine1),
                this.document.getElementById(block.answerConnect.idLine2),
                { startPlug: 'disc', endPlug: 'disc' }
              )
            );
          } else {
            this.saveEditing({
              ...block,
              answerConnect: { idLine1: '', idLine2: '' },
            });
          }
        }
      });
    }, 0);
  }

  drawLine([event, block]: [any, Block]): void {
    if (this.drawLineBoolean) {
      this.drawLineBlock = null;
      this.drawLineTarget = null;
      this.drawLineIndex = null;
      if (event.target.id.includes('answer')) {
        let forEachCheck = 0;
        let temporaryBoolean = true;
        block.answers.forEach((answer, index) => {
          if (!answer.idLine1 && !answer.idLine2 && temporaryBoolean) {
            this.drawLineBlock = {
              ...block,
              answers: [...block.answers],
            };
            this.drawLineBlock.answers[index] = {
              idLine1: event.target.id,
            };
            this.document.getElementById(
              event.target.id
            ).style.backgroundColor = 'green';
            this.drawLineIndex = index;
            temporaryBoolean = false;
            forEachCheck = -10;
          }
          forEachCheck++;
          if (forEachCheck === block.answers.length) {
            this.drawLineBlock = {
              ...block,
              answers: [...block.answers],
            };
            this.drawLineBlock.answers[index] = {
              idLine1: event.target.id,
            };
            this.document.getElementById(
              event.target.id
            ).style.backgroundColor = 'green';
            this.drawLineIndex = index;
            temporaryBoolean = false;
          }
        });
      } else {
        this.drawLineBlock = {
          ...block,
          answerConnect: { ...block.answerConnect, idLine1: event.target.id },
        };
        this.document.getElementById(
          this.drawLineBlock.answerConnect.idLine1
        ).style.backgroundColor = 'green';
      }
      this.drawLineTarget = event.target.id;
      this.drawLineBoolean = false;
    } else if (this.drawLineBlock.id === block.id) {
      this.notificationService.showError(
        'Nie legalna próba połączenia!',
        'Błąd!'
      );
      this.drawLineBoolean = true;
      if (document.getElementById(this.drawLineBlock.answerConnect?.idLine1)) {
        document.getElementById(
          this.drawLineBlock.answerConnect.idLine1
        ).style.backgroundColor = 'red';
      } else {
        document.getElementById(this.drawLineTarget).style.backgroundColor =
          'red';
      }
    } else if (
      event.target.id.includes('answer') &&
      this.drawLineBlock.answerConnect?.idLine1 &&
      !this.drawLineTarget.includes('answer')
    ) {
      let temporaryBlock: Block;
      const newBlock: Block = { ...block, answers: [...block.answers] };
      let first = true;
      let theSame = false;
      if (this.drawLineBlock.answerConnect?.idLine2 === event.target.id) {
        this.notificationService.showInfo(
          'Te bloki są już połączone!',
          'Informacja!'
        );
        theSame = true;
      }
      if (!theSame) {
        this.blocks.forEach((newestBlock) => {
          newestBlock?.answers?.find((answer, index) => {
            if (
              (answer.idLine2 === this.drawLineBlock.answerConnect.idLine1 &&
                answer.idLine1 === this.drawLineBlock.answerConnect?.idLine2) ||
              (answer.idLine1 === event.target.id && answer?.idLine2)
            ) {
              if (newBlock.id === newestBlock.id) {
                newBlock.answers[index] = { idLine1: '', idLine2: '' };
              } else {
                temporaryBlock = {
                  ...newestBlock,
                  answers: [...newestBlock.answers],
                };
                temporaryBlock.answers[index] = { idLine1: '', idLine2: '' };
                this.saveEditing(temporaryBlock);
              }
            }
          });

          if (newestBlock.answerConnect?.idLine2 === event.target.id) {
            temporaryBlock = {
              ...newestBlock,
              answerConnect: { idLine1: '', idLine2: '' },
            };
            this.saveEditing(temporaryBlock);
            this.notificationService.showInfo(
              'Linia została zmieniona!',
              'Informacja'
            );
          }
        });
        newBlock.answers?.forEach((answer, index) => {
          if (!answer.idLine1 && !answer.idLine2 && first) {
            newBlock.answers[index] = {
              idLine1: event.target.id,
              idLine2: this.drawLineBlock.answerConnect.idLine1,
            };
            this.saveEditing(newBlock);
            first = false;
          }
        });
        this.saveEditing({
          ...this.drawLineBlock,
          answerConnect: {
            ...this.drawLineBlock.answerConnect,
            idLine2: event.target.id,
          },
        });
      }
      this.drawLineBoolean = true;
    } else if (!event.target.id.includes('answer')) {
      if (!this.drawLineTarget.includes('answer')) {
        this.notificationService.showError(
          'Nie można łączyć odpowiedzi z odpowiedziami',
          'Błąd!'
        );
        this.drawLineBlock.answerConnect.idLine2
          ? (this.document.getElementById(
              this.drawLineBlock.answerConnect.idLine1
            ).style.backgroundColor = 'gold')
          : (this.document.getElementById(
              this.drawLineBlock.answerConnect.idLine1
            ).style.backgroundColor = 'red');
        this.drawLineBoolean = true;
      } else {
        let temporaryBlock: Block;
        let temporaryBoolean = true;
        let theSame = false;
        let first = true;
        this.drawLineBlock.answers.forEach((answer) => {
          block.answerConnect?.idLine2 ===
            this.drawLineBlock.answers[this.drawLineIndex].idLine1 &&
          block.answerConnect?.idLine2 === answer.idLine1 &&
          first
            ? (this.notificationService.showInfo(
                'Te bloki są już połączone!',
                'Informacja!'
              ),
              ((temporaryBoolean = false), (theSame = true), (first = false)))
            : null;
        });
        if (temporaryBoolean) {
          this.blocks.forEach((newBlock) => {
            newBlock.answerConnect?.idLine2 ===
            this.drawLineBlock.answers[this.drawLineIndex]?.idLine1
              ? ((temporaryBlock = {
                  ...newBlock,
                  answerConnect: { idLine1: '', idLine2: '' },
                }),
                this.saveEditing(temporaryBlock),
                this.blocks.forEach((newestBlock) => {
                  newestBlock.answers?.forEach((answer, index) => {
                    answer.idLine2 === event.target.id
                      ? ((temporaryBlock = {
                          ...newestBlock,
                          answers: [...newestBlock.answers],
                        }),
                        (temporaryBlock.answers[index] = {
                          idLine1: '',
                          idLine2: '',
                        }),
                        this.saveEditing(temporaryBlock))
                      : null;
                  });
                }),
                this.drawLineBlock.answers?.forEach((answer, index) => {
                  answer.idLine2 === event.target.id
                    ? (this.drawLineBlock.answers[index] = {
                        idLine1: '',
                        idLine2: '',
                      })
                    : null;
                }),
                this.notificationService.showInfo(
                  'Linia została zmieniona!',
                  'Informacja'
                ),
                (temporaryBoolean = false))
              : null;
          });
        }
        temporaryBoolean
          ? this.blocks.forEach((newestBlock) => {
              newestBlock.answers?.forEach((answer, index) => {
                answer.idLine2 === event.target.id
                  ? ((temporaryBlock = {
                      ...newestBlock,
                      answers: [...newestBlock.answers],
                    }),
                    (temporaryBlock.answers[index] = {
                      idLine1: '',
                      idLine2: '',
                    }),
                    this.saveEditing(temporaryBlock))
                  : null;
              });
            })
          : null;
        this.drawLineBlock.answers?.forEach((answer, index) => {
          answer.idLine2 === event.target.id
            ? (this.drawLineBlock.answers[index] = {
                idLine1: '',
                idLine2: '',
              })
            : null;
        });
        if (!theSame) {
          this.drawLineBlock.answers[this.drawLineIndex] = {
            ...this.drawLineBlock.answers[this.drawLineIndex],
            idLine2: event.target.id,
          };
          this.saveEditing(this.drawLineBlock);
          this.saveEditing({
            ...block,
            answerConnect: {
              idLine1: event.target.id,
              idLine2: this.drawLineBlock.answers[this.drawLineIndex].idLine1,
            },
          });
        }
      }
      this.drawLineBoolean = true;
    }
  }

  leaderLinePosition(): void {
    this.LeaderLines?.forEach((leaderLine) => {
      leaderLine.position();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
