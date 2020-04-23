import {createAction, props} from '@ngrx/store';
import {Owner} from '../core.types';

export const ownersAction = createAction(
  '[Owner] owners',
  props<{ owners: Owner[] }>()
);

export const ownerAction = createAction(
  '[Owner] owner',
  props<{ owner: Owner | null }>()
);

export const ownersLoadingAction = createAction(
  '[Owner] Owners loading',
  props<{ loading: boolean }>()
);

export const ownerLoadingAction = createAction(
  '[Owner] Owner loading',
  props<{ loading: boolean }>()
);

export const ownerDeleteAction = createAction(
  '[Owner] Delete an owner',
  props<{ id: number }>()
);

export const ownerSaveAction = createAction(
  '[Owner] Save an owner',
  props<{ owner: Owner; successCb: () => void }>()
);

export const ownersLoadAction = createAction(
  '[Owner] Load owners'
);

export const ownerLoadAction = createAction(
  '[Owner] Load an owner',
  props<{ id: number }>()
);
