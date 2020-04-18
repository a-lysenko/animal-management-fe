import {createAction, props} from '@ngrx/store';
import {Animal} from './animal.types';

export const animalsAction = createAction(
  '[Animal] animals',
  props<{ animals: Animal[] }>()
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

export const animalRemoveAction = createAction(
  '[Animal] Remove an animal',
  props<{ id: number }>()
);

export const animalsLoadAction = createAction(
  '[Animal] Load animals'
);

export const animalLoadAction = createAction(
  '[Animal] Load an animal',
  props<{ id: number }>()
);
