import { Injectable } from '@angular/core';
import {CoreModule} from '../core.module';
import {HttpClient} from '@angular/common/http';
import {Owner, OwnerId} from '../core.types';

@Injectable({
  providedIn: CoreModule
})
export class OwnerService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<Owner[]>('api/owners/all');
  }

  get(id: OwnerId) {
    return this.http.get<Owner>(`api/owners/${id}`);
  }

  add(ownerData: Omit<Owner, 'id'|'addressid'>) {
    return this.http.post<{ id: OwnerId }>(
      'api/owners/add',
      ownerData
    );
  }

  update(owner: Owner) {
    return this.http.put<{ id: OwnerId }>(
      'api/owners/update',
      owner
    );
  }

  delete(id: OwnerId) {
    return this.http.delete<{id: 1}>(`api/owners/remove/${id}`);
  }
}
