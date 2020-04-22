import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as animalActions from './animal.actions';
import {catchError, exhaustMap, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {AnimalService} from '../_core/animal.service';

@Injectable()
export class AnimalEffects {

  loadAnimals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(animalActions.animalsLoadAction),
      exhaustMap(() => {
        return this.animalService.getAll()
          .pipe(
            switchMap((animals) => {
              return [
                animalActions.animalsAction({animals}),
                animalActions.animalsLoadingAction({loading: false})
              ];
            }),
            catchError((data) => {
              console.log('Error', data);
              return of(animalActions.animalsLoadingAction({loading: false}))
            })
          );
      })
    )
  );

  loadAnimal$ = createEffect(
    () => this.actions$.pipe(
      ofType(animalActions.animalLoadAction),
      exhaustMap((action) => {
        return this.animalService.get(action.id)
          .pipe(
            switchMap((animal) => {
              return [
                animalActions.animalAction({animal}),
                animalActions.animalLoadingAction({loading: false})
              ];
            }),
            catchError((data) => {
              console.log('Error', data);
              return of(animalActions.animalLoadingAction({loading: false}))
            })
          );
      })
    )
  );

  deleteAnimal$ = createEffect(
    () => this.actions$.pipe(
      ofType(animalActions.animalDeleteAction),
      exhaustMap((action) => {
        return this.animalService.delete(action.id)
          .pipe(
            switchMap(() => {
              return [
                animalActions.animalsLoadingAction({loading: false}),
                animalActions.animalsLoadAction()
              ]
            }),
            catchError((data) => {
              console.log('Error', data);
              return of(animalActions.animalsLoadingAction({loading: false}))
            })
          );
      })
    )
  );

  saveAnimal$ = createEffect(
    () => this.actions$.pipe(
      ofType(animalActions.animalSaveAction),
      exhaustMap((action) => {
        return (() => {
          if (action.animal.id != null) {
            return this.animalService.update(action.animal);
          }
          return this.animalService.add(action.animal);
        })()
          .pipe(
            tap(() => action.successCb()),
            switchMap(() => {
              return [
                animalActions.animalLoadingAction({loading: false}),
                animalActions.animalsLoadAction()
              ]
            }),
            catchError((data) => {
              console.log('Error', data);
              return of(animalActions.animalLoadingAction({loading: false}))
            })
          );
      })
    )
  );


  constructor(
    private actions$: Actions,
    private animalService: AnimalService
  ) {
  }
}
