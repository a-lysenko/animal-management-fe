import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as wildAnimalActions from './wild-animal.actions';
import {WildAnimal} from './wild-animal.types';
import {selectAnimalsWithLoading} from '../_core/animal/animal.reducer';

export interface WildAnimalState {
  wildAnimals: WildAnimal[];
  wildAnimal: WildAnimal | null;
  wildAnimalsLoading: boolean;
  wildAnimalLoading: boolean;
}

export const animalInitialState: WildAnimalState = {
  wildAnimals: [],
  wildAnimal: null,
  wildAnimalsLoading: false,
  wildAnimalLoading: false
};

const wildAnimalReducer = createReducer(
  animalInitialState,
  on(wildAnimalActions.wildAnimalsAction, (state, {wildAnimals}) => ({
    ...state,
    wildAnimals
  })),
  on(wildAnimalActions.wildAnimalAction, (state, {wildAnimal}) => ({
    ...state,
    wildAnimal
  })),
  on(wildAnimalActions.wildAnimalsLoadingAction, (state, {loading}) => ({
    ...state,
    wildAnimalsLoading: loading
  })),
  on(wildAnimalActions.wildAnimalLoadingAction, (state, {loading}) => ({
    ...state,
    wildAnimalLoading: loading
  })),
  on(
    wildAnimalActions.wildAnimalsLoadAction,
    wildAnimalActions.wildAnimalDeleteAction,
    (state) => ({
      ...state,
      wildAnimalsLoading: true
    })
  ),
  on(
    wildAnimalActions.wildAnimalLoadAction,
    wildAnimalActions.wildAnimalSaveAction,
    (state) => ({
      ...state,
      wildAnimalLoading: true
    })
  )
);

export const wildAnimalFeatureKey = 'wild-animal';

export function reducer(state: WildAnimalState | undefined, action: Action) {
  return wildAnimalReducer(state, action);
}

export const selectFeature = createFeatureSelector<WildAnimalState>(wildAnimalFeatureKey);

export const selectWildAnimalsWithLoading = createSelector(
  selectFeature,
  ({wildAnimals, wildAnimalsLoading}) => ({wildAnimals, wildAnimalsLoading})
);

export const selectWildAnimalWithLoading = createSelector(
  selectFeature,
  ({wildAnimal, wildAnimalLoading}) => ({wildAnimal, wildAnimalLoading})
);

export const selectWildAnimalModel = createSelector(
  selectWildAnimalWithLoading,
  selectAnimalsWithLoading,
  (wildAnimalWith, animalsWith) => {
    return {
      ...wildAnimalWith,
      dataLoading: wildAnimalWith.wildAnimalLoading || animalsWith.animalsLoading,
      animalsToSelect: wildAnimalWith.wildAnimal
        ? [{...wildAnimalWith.wildAnimal, id: wildAnimalWith.wildAnimal.animalid}]
        : animalsWith.animals.filter(({ispet, iswild}) => {
          return !ispet && !iswild;
        })
    }
  }
)

