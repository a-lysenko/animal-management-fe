import {Action, createFeatureSelector, createReducer, createSelector, on, State} from "@ngrx/store";
import {Animal} from "./animal.types";
import * as animalActions from "./animal.actions";

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

export interface AnimalState {
  animals: Animal[];
  animal: Animal | null;
  animalsLoading: boolean;
  animalLoading: boolean;
}

export const animalInitialState: AnimalState = {
  animals: mockAnimals,
  animal: mockAnimals[0],
  animalsLoading: false,
  animalLoading: false
}

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
  }))
)

export const animalFeatureKey = 'animal';

export function reducer(state: AnimalState | undefined, action: Action) {
  return animalReducer(state, action);
}

export const selectFeature = createFeatureSelector<AnimalState>(animalFeatureKey);

export const selectAnimals = createSelector(
  selectFeature,
  ({animals}) => animals
)

export const selectAnimal = createSelector(
  selectFeature,
  ({animal}) => animal
)
