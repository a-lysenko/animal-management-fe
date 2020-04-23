import {createAction, props} from '@ngrx/store';
import {Pet} from './pet.types';

export const petsAction = createAction(
  '[Pet] pets',
  props<{ pets: Pet[] }>()
);

export const petAction = createAction(
  '[Pet] pet',
  props<{ pet: Pet | null }>()
);

export const petsLoadingAction = createAction(
  '[Pet] Animals loading',
  props<{ loading: boolean }>()
);

export const petLoadingAction = createAction(
  '[Pet] Pet loading',
  props<{ loading: boolean }>()
);

export const petDeleteAction = createAction(
  '[Pet] Delete an pet',
  props<{ id: number }>()
);

export const petSaveAction = createAction(
  '[Pet] Save an pet',
  props<{ pet: Pick<Pet, 'id' | 'animalid' | 'ownerid'>; successCb: () => void }>()
);

export const petsLoadAction = createAction(
  '[Pet] Load pets'
);

export const petLoadAction = createAction(
  '[Pet] Load a pet',
  props<{ id: number }>()
);
