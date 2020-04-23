import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as petActions from './pet.actions';
import {catchError, exhaustMap, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {PetService} from '../_core/pet.service';

@Injectable()
export class PetEffects {

  loadAnimals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(petActions.petsLoadAction),
      exhaustMap(() => {
        return this.petService.getAll()
          .pipe(
            switchMap((pets) => {
              return [
                petActions.petsAction({pets}),
                petActions.petsLoadingAction({loading: false})
              ];
            }),
            catchError((data) => {
              console.log('Error', data);
              return of(petActions.petsLoadingAction({loading: false}))
            })
          );
      })
    )
  );

  loadAnimal$ = createEffect(
    () => this.actions$.pipe(
      ofType(petActions.petLoadAction),
      exhaustMap((action) => {
        return this.petService.get(action.id)
          .pipe(
            switchMap((pet) => {
              return [
                petActions.petAction({pet}),
                petActions.petLoadingAction({loading: false})
              ];
            }),
            catchError((data) => {
              console.log('Error', data);
              return of(petActions.petLoadingAction({loading: false}))
            })
          );
      })
    )
  );

  deleteAnimal$ = createEffect(
    () => this.actions$.pipe(
      ofType(petActions.petDeleteAction),
      exhaustMap((action) => {
        return this.petService.delete(action.id)
          .pipe(
            switchMap(() => {
              return [
                petActions.petsLoadingAction({loading: false}),
                petActions.petsLoadAction()
              ]
            }),
            catchError((data) => {
              console.log('Error', data);
              return of(petActions.petsLoadingAction({loading: false}))
            })
          );
      })
    )
  );

  saveAnimal$ = createEffect(
    () => this.actions$.pipe(
      ofType(petActions.petSaveAction),
      exhaustMap((action) => {
        return (() => {
          if (action.pet.id != null) {
            return this.petService.update(action.pet);
          }
          return this.petService.add(action.pet);
        })()
          .pipe(
            tap(() => action.successCb()),
            switchMap(() => {
              return [
                petActions.petLoadingAction({loading: false}),
                petActions.petsLoadAction()
              ]
            }),
            catchError((data) => {
              console.log('Error', data);
              return of(petActions.petLoadingAction({loading: false}))
            })
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private petService: PetService
  ) {
  }
}
