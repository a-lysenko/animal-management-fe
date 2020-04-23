import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as wildAnimalActions from './wild-animal.actions';
import {catchError, exhaustMap, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {WildAnimalService} from '../_core/wild-animal.service';

@Injectable()
export class WildAnimalEffects {

  loadAnimals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(wildAnimalActions.wildAnimalsLoadAction),
      exhaustMap(() => {
        return this.wildAnimalService.getAll()
          .pipe(
            switchMap((wildAnimals) => {
              return [
                wildAnimalActions.wildAnimalsAction({wildAnimals}),
                wildAnimalActions.wildAnimalsLoadingAction({loading: false})
              ];
            }),
            catchError((data) => {
              console.log('Error', data);
              return of(wildAnimalActions.wildAnimalsLoadingAction({loading: false}))
            })
          );
      })
    )
  );

  loadAnimal$ = createEffect(
    () => this.actions$.pipe(
      ofType(wildAnimalActions.wildAnimalLoadAction),
      exhaustMap((action) => {
        return this.wildAnimalService.get(action.id)
          .pipe(
            switchMap((wildAnimal) => {
              return [
                wildAnimalActions.wildAnimalAction({wildAnimal}),
                wildAnimalActions.wildAnimalLoadingAction({loading: false})
              ];
            }),
            catchError((data) => {
              console.log('Error', data);
              return of(wildAnimalActions.wildAnimalLoadingAction({loading: false}))
            })
          );
      })
    )
  );

  deleteAnimal$ = createEffect(
    () => this.actions$.pipe(
      ofType(wildAnimalActions.wildAnimalDeleteAction),
      exhaustMap((action) => {
        return this.wildAnimalService.delete(action.id)
          .pipe(
            switchMap(() => {
              return [
                wildAnimalActions.wildAnimalsLoadingAction({loading: false}),
                wildAnimalActions.wildAnimalsLoadAction()
              ]
            }),
            catchError((data) => {
              console.log('Error', data);
              return of(wildAnimalActions.wildAnimalsLoadingAction({loading: false}))
            })
          );
      })
    )
  );

  saveAnimal$ = createEffect(
    () => this.actions$.pipe(
      ofType(wildAnimalActions.wildAnimalSaveAction),
      exhaustMap((action) => {
        return (() => {
          if (action.wildAnimal.id != null) {
            return this.wildAnimalService.update(action.wildAnimal);
          }
          return this.wildAnimalService.add(action.wildAnimal);
        })()
          .pipe(
            tap(() => action.successCb()),
            switchMap(() => {
              return [
                wildAnimalActions.wildAnimalLoadingAction({loading: false}),
                wildAnimalActions.wildAnimalsLoadAction()
              ]
            }),
            catchError((data) => {
              console.log('Error', data);
              return of(wildAnimalActions.wildAnimalLoadingAction({loading: false}))
            })
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private wildAnimalService: WildAnimalService
  ) {
  }
}
