import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {ownerFeatureKey, OwnerState, selectOwnersWithLoading} from '../../_core/owner/owner.reducer';
import {ownerDeleteAction, ownersLoadAction} from '../../_core/owner/owner.actions';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {OwnerCardComponent} from '../owner-card/owner-card.component';
import {Owner} from '../../_core/core.types';

interface OwnerListModel {
  owners: (Owner & {fullAddress: string})[];
  ownersLoading: boolean;
}

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OwnerListComponent implements OnInit {

  model$: Observable<OwnerListModel>;

  constructor(
    private dialog: MatDialog,
    private store: Store<{ [ownerFeatureKey]: OwnerState }>
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(ownersLoadAction());

    this.model$ = this.store.pipe(
      select(selectOwnersWithLoading),
      // this prevents an error Error: ExpressionChangedAfterItHasBeenCheckedError when owner card opens
      // besides, check here may have a positive effect to the performance along rendering
      distinctUntilChanged(
        (prev, current) => JSON.stringify(prev) === JSON.stringify(current)
      ),
      map((model) => {
        return {
          ...model,
          owners: model.owners.map((owner) => {
            return {
              ...owner,
              fullAddress: [owner.street, owner.city, owner.country, owner.zipcode].join(', ')
            }
          })
        };
      })
    );
  }

  openCard(owner: Partial<Owner>) {
    this.dialog.open(OwnerCardComponent, {
      width: '70vw',
      maxWidth: '500px',
      data: {id: owner.id}
    });
  }

  delete(owner: Owner) {
    console.log('Owner to delete', owner);
    this.store.dispatch(ownerDeleteAction({id: owner.id}));
  }

  trackByFn(index: number, item: Owner) {
    return item.id;
  }

}
