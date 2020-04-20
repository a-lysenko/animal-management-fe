import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as animalActions from './animal.actions';
import {exhaustMap, map, switchMap, tap} from 'rxjs/operators';
import {timer} from 'rxjs';
import {Animal} from './animal.types';
import {Injectable} from '@angular/core';

const mockAnimals: Animal[] = [
  {
    birthday: new Date(2015, 1, 2),
    species: 'Mastiff',
    vaccinated: false
  },
  {
    birthday: new Date(2016, 2, 3),
    species: 'Bulldog',
    vaccinated: true
  },
  {
    birthday: new Date(2012, 5, 15),
    species: 'Poodle',
    vaccinated: false
  }
].map((item, id) => ({id, ...item}));

const mockAnimal = {
  id: 42,
  birthday: new Date(2015, 1, 2),
  species: 'Mastiff',
  vaccinated: false
};

@Injectable()
export class AnimalEffects {

  loadAnimals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(animalActions.animalsLoadAction),
      exhaustMap(() => {
        return timer(1500).pipe(
          switchMap(() => ([
              animalActions.animalsAction({animals: mockAnimals}),
              animalActions.animalsLoadingAction({loading: false})
            ])
          )
        );
      })
    )
  );

  loadAnimal$ = createEffect(
    () => this.actions$.pipe(
      ofType(animalActions.animalLoadAction),
      exhaustMap(() => {
        return timer(1500).pipe(
          switchMap(() => ([
              animalActions.animalAction({animal: mockAnimal}),
              animalActions.animalLoadingAction({loading: false})
            ])
          )
        );
      })
    )
  );

  deleteAnimal$ = createEffect(
    () => this.actions$.pipe(
      ofType(animalActions.animalDeleteAction),
      exhaustMap((action) => {
        return timer(2500).pipe(
          map(() => animalActions.animalsLoadingAction({loading: false}))
        );
      })
    )
  );

  saveAnimal$ = createEffect(
    () => this.actions$.pipe(
      ofType(animalActions.animalSaveAction),
      exhaustMap((action) => {
        return timer(1500).pipe(
          tap(() => action.successCb()),
          map(() => animalActions.animalLoadingAction({loading: false}))
        );
      })
    )
  );


  constructor(
    private actions$: Actions
  ) {
  }
}
