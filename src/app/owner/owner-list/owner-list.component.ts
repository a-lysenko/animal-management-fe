import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {ownerFeatureKey, OwnerState, selectOwnersWithLoading} from '../../owner/owner.reducer';
import {ownerDeleteAction, ownersLoadAction} from '../../owner/owner.actions';
import {distinctUntilChanged} from 'rxjs/operators';
import {Owner} from '../../owner/owner.types';
import {OwnerCardComponent} from '../../owner/owner-card/owner-card.component';

interface OwnerListModel {
  owners: Owner[];
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
      )
    );
  }

  openCard(owner: Partial<Owner>) {
    const dialogRef = this.dialog.open(OwnerCardComponent, {
      width: '70vw',
      maxWidth: '500px',
      data: {id: owner.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.store.dispatch(ownersLoadAction());
      }
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
