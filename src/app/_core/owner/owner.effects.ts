import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {OwnerService} from './owner.service';
import * as ownerActions from './owner.actions';

@Injectable()
export class OwnerEffects {

  loadOwners$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ownerActions.ownersLoadAction),
      exhaustMap(() => {
        return this.ownerService.getAll()
          .pipe(
            switchMap((owners) => {
              return [
                ownerActions.ownersAction({owners}),
                ownerActions.ownersLoadingAction({loading: false})
              ];
            }),
            catchError((data) => {
              console.log('Error', data);
              return of(ownerActions.ownersLoadingAction({loading: false}))
            })
          );
      })
    )
  );

  loadOwner$ = createEffect(
    () => this.actions$.pipe(
      ofType(ownerActions.ownerLoadAction),
      exhaustMap((action) => {
        return this.ownerService.get(action.id)
          .pipe(
            switchMap((owner) => {
              return [
                ownerActions.ownerAction({owner}),
                ownerActions.ownerLoadingAction({loading: false})
              ];
            }),
            catchError((data) => {
              console.log('Error', data);
              return of(ownerActions.ownerLoadingAction({loading: false}))
            })
          );
      })
    )
  );

  deleteOwner$ = createEffect(
    () => this.actions$.pipe(
      ofType(ownerActions.ownerDeleteAction),
      exhaustMap((action) => {
        return this.ownerService.delete(action.id)
          .pipe(
            switchMap(() => {
              return [
                ownerActions.ownersLoadingAction({loading: false}),
                ownerActions.ownersLoadAction()
              ]
            }),
            catchError((data) => {
              console.log('Error', data);
              return of(ownerActions.ownersLoadingAction({loading: false}))
            })
          );
      })
    )
  );

  saveOwner$ = createEffect(
    () => this.actions$.pipe(
      ofType(ownerActions.ownerSaveAction),
      exhaustMap((action) => {
        return (() => {
          if (action.owner.id != null) {
            return this.ownerService.update(action.owner);
          }
          return this.ownerService.add(action.owner);
        })()
          .pipe(
            tap(() => action.successCb()),
            switchMap(() => {
              return [
                ownerActions.ownerLoadingAction({loading: false}),
                ownerActions.ownersLoadAction()
              ]
            }),
            catchError((data) => {
              console.log('Error', data);
              return of(ownerActions.ownerLoadingAction({loading: false}))
            })
          );
      })
    )
  );


  constructor(
    private actions$: Actions,
    private ownerService: OwnerService
  ) {
  }
}
