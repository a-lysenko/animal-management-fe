import { Injectable } from '@angular/core';
import {CoreModule} from './core.module';
import {HttpClient} from '@angular/common/http';
import {AnimalId} from './core.types';
import {WildAnimal} from '../wild-animal/wild-animal.types';

@Injectable({
  providedIn: CoreModule
})
export class WildAnimalService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<WildAnimal[]>('api/wild-animals/all');
  }

  get(id: AnimalId) {
    return this.http.get<WildAnimal>(`api/wild-animals/${id}`);
  }

  add(animalData: Pick<WildAnimal, 'animalid' | 'trackingid'>) {
    return this.http.post<{ id: AnimalId }>(
      'api/wild-animals/add',
      animalData
    );
  }

  update(animal: Pick<WildAnimal, 'id' | 'trackingid'>) {
    return this.http.put<{ id: AnimalId }>(
      'api/wild-animals/update',
      animal
    );
  }

  delete(id: AnimalId) {
    return this.http.delete<{id: 1}>(`api/wild-animals/remove/${id}`);
  }
}
