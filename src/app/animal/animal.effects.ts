import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as animalActions from './animal.actions'
import {exhaustMap, switchMap} from "rxjs/operators";
import {of} from "rxjs"
import {Animal} from "./animal.types";
import {Injectable} from "@angular/core";
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
        return of(animalActions.animalsAction({animals: mockAnimals}))
      })
    )
  );

  loadAnimal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(animalActions.animalLoadAction),
      exhaustMap(() => {
        return of(animalActions.animalAction({animal: mockAnimal}))
      })
    )
  );

  constructor(
    private actions$: Actions
  ) {
  }
}
