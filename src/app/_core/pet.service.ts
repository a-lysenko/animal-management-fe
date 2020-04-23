import { Injectable } from '@angular/core';
import {CoreModule} from './core.module';
import {HttpClient} from '@angular/common/http';
import {AnimalId} from './core.types';
import {Pet} from '../pet/pet.types';

@Injectable({
  providedIn: CoreModule
})
export class PetService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<Pet[]>('api/pets/all');
  }

  get(id: AnimalId) {
    return this.http.get<Pet>(`api/pets/${id}`);
  }

  add(animalData: Pick<Pet, 'animalid' | 'ownerid'>) {
    return this.http.post<{ id: AnimalId }>(
      'api/pets/add',
      animalData
    );
  }

  update(animal: Pick<Pet, 'id' | 'animalid' | 'ownerid'>) {
    return this.http.put<{ id: AnimalId }>(
      'api/pets/update',
      animal
    );
  }

  delete(id: AnimalId) {
    return this.http.delete<{id: 1}>(`api/pets/remove/${id}`);
  }
}
