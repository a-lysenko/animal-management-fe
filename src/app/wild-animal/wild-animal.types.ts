import {Animal, AnimalId} from '../_core/core.types';

export interface WildAnimal extends Omit<Animal, 'ispet' | 'iswild'> {
  trackingid: number;
  animalid: AnimalId;
}
