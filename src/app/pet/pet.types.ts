import {Animal, AnimalId, OwnerId} from '../_core/core.types';

export interface Pet extends Omit<Animal, 'ispet' | 'iswild'> {
  animalid: AnimalId;
  ownerid: OwnerId;
  fullname: string;
}
