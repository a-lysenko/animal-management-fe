import {Action, createFeatureSelector, createReducer, createSelector, on, State} from '@ngrx/store';
import {Animal} from './animal.types';
import * as animalActions from './animal.actions';

export interface AnimalState {
  animals: Animal[];
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
  on(animalActions.animalsLoadAction, (state) => ({
    ...state,
    animalsLoading: true
  })),
  on(animalActions.animalLoadAction, (state) => ({
    ...state,
    animalLoading: true
  }))
);

export const animalFeatureKey = 'animal';

export function reducer(state: AnimalState | undefined, action: Action) {
  return animalReducer(state, action);
}

export const selectFeature = createFeatureSelector<AnimalState>(animalFeatureKey);

export const selectAnimals = createSelector(
  selectFeature,
  ({animals}) => animals
);

export const selectAnimal = createSelector(
  selectFeature,
  ({animal}) => animal
);
