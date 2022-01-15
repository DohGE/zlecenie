import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import { Auth } from '../../../shared/models/auth.model';
import { Block } from '../../../shared/models/block.model';
import { Game } from '../../../shared/models/game.model';
import { AuthFacade } from '../../auth/store/auth.facade';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private readonly endpoints = {
    link: 'https://quiziz-ebe4c-default-rtdb.firebaseio.com/',
    games: '/games.json',
    blocks: '/blocks.json',
  };
  constructor(private http: HttpClient, private authFacade: AuthFacade) {}

  loadGames(): Observable<Game[]> {
    return this.authFacade.auth$.pipe(
      take(1),
      exhaustMap((auth: Auth) => {
        return this.http
          .get<Game[]>(this.endpoints.link + this.endpoints.games, {
            params: new HttpParams().set('auth', auth?.idToken),
          })
          .pipe(
            map((games: Game[]) => {
              return games.map((game, index) => {
                return { ...game, id: index++ };
              });
            })
          );
      })
    );
  }

  saveGame(games: Game[]): Observable<Game[]> {
    return this.authFacade.auth$.pipe(
      take(1),
      exhaustMap((auth: Auth) => {
        return this.http.put<Game[]>(
          this.endpoints.link + this.endpoints.games,
          games,
          {
            params: new HttpParams().set('auth', auth?.idToken),
          }
        );
      })
    );
  }

  loadBlocks(): Observable<Block[]> {
    return this.authFacade.auth$.pipe(
      take(1),
      exhaustMap((auth: Auth) => {
        return this.http
          .get<Block[]>(
            this.endpoints.link + auth.localId + this.endpoints.blocks,
            {
              params: new HttpParams().set('auth', auth?.idToken),
            }
          )
          .pipe(
            map((blocks: Block[]) => {
              if (blocks === null) {
                return (blocks = []);
              } else {
                return blocks;
              }
            })
          );
      })
    );
  }

  saveBlocks(blocks: Block[]): Observable<Block[]> {
    return this.authFacade.auth$.pipe(
      take(1),
      exhaustMap((auth: Auth) => {
        return this.http.put<Block[]>(
          this.endpoints.link + auth.localId + this.endpoints.blocks,
          blocks,
          {
            params: new HttpParams().set('auth', auth?.idToken),
          }
        );
      })
    );
  }
}
