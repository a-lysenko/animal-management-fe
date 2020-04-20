import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as ownerActions from './owner.actions';
import {exhaustMap, map, switchMap, tap} from 'rxjs/operators';
import {timer} from 'rxjs';
import {Owner} from './owner.types';
import {Injectable} from '@angular/core';

const mockOwners: Owner[] = [
  {
    fullName: 'John Lennon',
    address: 'Hauptstr. 5 01234 Musterstadt Germany'
  },
  {
    fullName: 'Paul McCartney',
    address: 'Hauptstr. 5 01234 Musterstadt Germany'
  },
  {
    fullName: 'George Harrison',
    address: 'Hauptstr. 5 01234 Musterstadt Germany'
  },
  {
    fullName: 'Ringo Starr',
    address: 'Hauptstr. 5 01234 Musterstadt Germany'
  }
].map((item, id) => ({id, ...item}));

const mockOwner = {
  id: 42,
  fullName: 'Paul McCartney',
  address: 'Hauptstr. 5 01234 Musterstadt Germany'
};

@Injectable()
export class OwnerEffects {

  loadOwners$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ownerActions.ownersLoadAction),
      exhaustMap(() => {
        return timer(1500).pipe(
          switchMap(() => ([
              ownerActions.ownersAction({owners: mockOwners}),
              ownerActions.ownersLoadingAction({loading: false})
            ])
          )
        );
      })
    )
  );

  loadOwner$ = createEffect(
    () => this.actions$.pipe(
      ofType(ownerActions.ownerLoadAction),
      exhaustMap(() => {
        return timer(1500).pipe(
          switchMap(() => ([
              ownerActions.ownerAction({owner: mockOwner}),
              ownerActions.ownerLoadingAction({loading: false})
            ])
          )
        );
      })
    )
  );

  deleteOwner$ = createEffect(
    () => this.actions$.pipe(
      ofType(ownerActions.ownerDeleteAction),
      exhaustMap((action) => {
        return timer(2500).pipe(
          map(() => ownerActions.ownersLoadingAction({loading: false}))
        );
      })
    )
  );

  saveOwner$ = createEffect(
    () => this.actions$.pipe(
      ofType(ownerActions.ownerSaveAction),
      exhaustMap((action) => {
        return timer(1500).pipe(
          tap(() => action.successCb()),
          map(() => ownerActions.ownerLoadingAction({loading: false}))
        );
      })
    )
  );


  constructor(
    private actions$: Actions
  ) {
  }
}
