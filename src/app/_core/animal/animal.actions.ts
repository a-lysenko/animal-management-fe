import {createAction, props} from '@ngrx/store';
import {Animal, AnimalFlagged} from '../core.types';

export const animalsAction = createAction(
  '[Animal] animals',
  props<{ animals: AnimalFlagged[] }>()
);

export const animalAction = createAction(
  '[Animal] animal',
  props<{ animal: Animal | null }>()
);

export const animalsLoadingAction = createAction(
  '[Animal] Animals loading',
  props<{ loading: boolean }>()
);

export const animalLoadingAction = createAction(
  '[Animal] Animal loading',
  props<{ loading: boolean }>()
);

export const animalDeleteAction = createAction(
  '[Animal] Delete an animal',
  props<{ id: number }>()
);

export const animalSaveAction = createAction(
  '[Animal] Save an animal',
  props<{ animal: Animal; successCb: () => void }>()
);

export const animalsLoadAction = createAction(
  '[Animal] Load animals'
);

export const animalLoadAction = createAction(
  '[Animal] Load an animal',
  props<{ id: number }>()
);
