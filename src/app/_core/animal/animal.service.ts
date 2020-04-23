import { Injectable } from '@angular/core';
import {CoreModule} from '../core.module';
import {HttpClient} from '@angular/common/http';
import {Animal, AnimalFlagged, AnimalId} from '../core.types';

@Injectable({
  providedIn: CoreModule
})
export class AnimalService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<AnimalFlagged[]>('api/animals/all');
  }

  get(id: AnimalId) {
    return this.http.get<Animal>(`api/animals/${id}`);
  }

  add(animalData: Omit<Animal, 'id'>) {
    return this.http.post<{ id: AnimalId }>(
      'api/animals/add',
      animalData
    );
  }

  update(animal: Animal) {
    return this.http.put<{ id: AnimalId }>(
      'api/animals/update',
      animal
    );
  }

  delete(id: AnimalId) {
    return this.http.delete<{id: 1}>(`api/animals/remove/${id}`);
  }
}
