import {createAction, props} from '@ngrx/store';
import {WildAnimal} from './wild-animal.types';

export const wildAnimalsAction = createAction(
  '[WildAnimal] wildAnimals',
  props<{ wildAnimals: WildAnimal[] }>()
);

export const wildAnimalAction = createAction(
  '[WildAnimal] wildAnimal',
  props<{ wildAnimal: WildAnimal | null }>()
);

export const wildAnimalsLoadingAction = createAction(
  '[WildAnimal] Animals loading',
  props<{ loading: boolean }>()
);

export const wildAnimalLoadingAction = createAction(
  '[WildAnimal] WildAnimal loading',
  props<{ loading: boolean }>()
);

export const wildAnimalDeleteAction = createAction(
  '[WildAnimal] Delete an wildAnimal',
  props<{ id: number }>()
);

export const wildAnimalSaveAction = createAction(
  '[WildAnimal] Save an wildAnimal',
  props<{ wildAnimal: Pick<WildAnimal, 'id' | 'animalid' | 'trackingid'>; successCb: () => void }>()
);

export const wildAnimalsLoadAction = createAction(
  '[WildAnimal] Load wildAnimals'
);

export const wildAnimalLoadAction = createAction(
  '[WildAnimal] Load an wildAnimal',
  props<{ id: number }>()
);
