import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as petActions from './pet.actions';
import {Pet} from './pet.types';
import {selectAnimalsWithLoading} from '../_core/animal/animal.reducer';
import {selectOwnersWithLoading} from '../_core/owner/owner.reducer';

export interface PetState {
  pets: Pet[];
  pet: Pet | null;
  petsLoading: boolean;
  petLoading: boolean;
}

export const petInitialState: PetState = {
  pets: [],
  pet: null,
  petsLoading: false,
  petLoading: false
};

const petReducer = createReducer(
  petInitialState,
  on(petActions.petsAction, (state, {pets}) => ({
    ...state,
    pets
  })),
  on(petActions.petAction, (state, {pet}) => ({
    ...state,
    pet
  })),
  on(petActions.petsLoadingAction, (state, {loading}) => ({
    ...state,
    petsLoading: loading
  })),
  on(petActions.petLoadingAction, (state, {loading}) => ({
    ...state,
    petLoading: loading
  })),
  on(
    petActions.petsLoadAction,
    petActions.petDeleteAction,
    (state) => ({
      ...state,
      petsLoading: true
    })
  ),
  on(
    petActions.petLoadAction,
    petActions.petSaveAction,
    (state) => ({
      ...state,
      petLoading: true
    })
  )
);

export const petFeatureKey = 'pet-animal';

export function reducer(state: PetState | undefined, action: Action) {
  return petReducer(state, action);
}

export const selectFeature = createFeatureSelector<PetState>(petFeatureKey);

export const selectPetsWithLoading = createSelector(
  selectFeature,
  ({pets, petsLoading}) => ({pets, petsLoading})
);

export const selectPetWithLoading = createSelector(
  selectFeature,
  ({pet, petLoading}) => ({pet, petLoading})
);

export const selectPetModel = createSelector(
  selectPetWithLoading,
  selectAnimalsWithLoading,
  selectOwnersWithLoading,
  (
    petWith,
    animalsWith,
    ownersWith
  ) => {
    return {
      ...petWith,
      dataLoading: petWith.petLoading || animalsWith.animalsLoading || ownersWith.ownersLoading,
      animalsToSelect: animalsWith.animals.filter(({id, ispet, iswild}) => {
          return (!ispet || (petWith.pet && id === petWith.pet.animalid)) && !iswild;
        }),
      ownersToSelect: ownersWith.owners
    }
  }
)

