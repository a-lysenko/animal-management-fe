import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as ownerActions from './owner.actions';
import {Owner} from '../core.types';

export interface OwnerState {
  owners: Owner[];
  owner: Owner | null;
  ownersLoading: boolean;
  ownerLoading: boolean;
}

export const ownerInitialState: OwnerState = {
  owners: [],
  owner: null,
  ownersLoading: false,
  ownerLoading: false
};

const ownerReducer = createReducer(
  ownerInitialState,
  on(ownerActions.ownersAction, (state, {owners}) => ({
    ...state,
    owners
  })),
  on(ownerActions.ownerAction, (state, {owner}) => ({
    ...state,
    owner
  })),
  on(ownerActions.ownersLoadingAction, (state, {loading}) => ({
    ...state,
    ownersLoading: loading
  })),
  on(ownerActions.ownerLoadingAction, (state, {loading}) => ({
    ...state,
    ownerLoading: loading
  })),
  on(
    ownerActions.ownersLoadAction,
    ownerActions.ownerDeleteAction,
    (state) => ({
      ...state,
      ownersLoading: true
    })
  ),
  on(
    ownerActions.ownerLoadAction,
    ownerActions.ownerSaveAction,
    (state) => ({
      ...state,
      ownerLoading: true
    })
  )
);

export const ownerFeatureKey = 'owner';

export function reducer(state: OwnerState | undefined, action: Action) {
  return ownerReducer(state, action);
}

export const selectFeature = createFeatureSelector<OwnerState>(ownerFeatureKey);

export const selectOwnersWithLoading = createSelector(
  selectFeature,
  ({owners, ownersLoading}) => ({owners, ownersLoading})
);

export const selectOwnerWithLoading = createSelector(
  selectFeature,
  ({owner, ownerLoading}) => ({owner, ownerLoading})
);
