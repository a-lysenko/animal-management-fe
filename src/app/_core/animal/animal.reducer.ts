import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as animalActions from './animal.actions';
import {Animal, AnimalFlagged} from '../core.types';

export interface AnimalState {
  animals: AnimalFlagged[];
  animal: Animal | null;
  animalsLoading: boolean;
  animalLoading: boolean;
}

export const animalInitialState: AnimalState = {
  animals: [],
  animal: null,
  animalsLoading: false,
  animalLoading: false
};

const animalReducer = createReducer(
  animalInitialState,
  on(animalActions.animalsAction, (state, {animals}) => ({
    ...state,
    animals
  })),
  on(animalActions.animalAction, (state, {animal}) => ({
    ...state,
    animal
  })),
  on(animalActions.animalsLoadingAction, (state, {loading}) => ({
    ...state,
    animalsLoading: loading
  })),
  on(animalActions.animalLoadingAction, (state, {loading}) => ({
    ...state,
    animalLoading: loading
  })),
  on(
    animalActions.animalsLoadAction,
    animalActions.animalDeleteAction,
    (state) => ({
      ...state,
      animalsLoading: true
    })
  ),
  on(
    animalActions.animalLoadAction,
    animalActions.animalSaveAction,
    (state) => ({
      ...state,
      animalLoading: true
    })
  )
);

export const animalFeatureKey = 'animal';

export function reducer(state: AnimalState | undefined, action: Action) {
  return animalReducer(state, action);
}

export const selectFeature = createFeatureSelector<AnimalState>(animalFeatureKey);

export const selectFullAnimalsWithLoading = createSelector(
  selectFeature,
  ({animals, animalsLoading}) => ({animals, animalsLoading})
);

export const selectAnimalsWithLoading = createSelector(
  selectFullAnimalsWithLoading,
  ({animals, animalsLoading}) => ({animals, animalsLoading})
);

export const selectAnimalWithLoading = createSelector(
  selectFeature,
  ({animal, animalLoading}) => ({animal, animalLoading})
);
