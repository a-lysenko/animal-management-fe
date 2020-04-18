import {createAction, props} from "@ngrx/store";
import {Animal} from "./animal.types";

export const animalsAction = createAction(
  '[Animal] animals',
  props<{ animals: Animal[] }>()
)

export const animalAction = createAction(
  '[Animal] animal',
  props<{ animal: Animal | null }>()
)

export const animalsLoadingAction = createAction(
  '[Animal] Animals loading',
  props<{ loading: boolean }>()
)

export const animalLoadingAction = createAction(
  '[Animal] Animal loading',
  props<{ loading: boolean }>()
)

export const animalRemoveAction = createAction(
  '[Animal] Remove an animal',
  props<{ id: number }>()
);

export const animalAddAction = createAction(
  '[Animal] Add an animal',
  props<{ animal: Omit<Animal, 'id'> }>()
);

export const animalEditAction = createAction(
  '[Animal] Edit an animal',
  props<{ animal: Animal }>()
);
