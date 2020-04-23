import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs';
import {PetCardComponent} from '../pet-card/pet-card.component';
import {MatDialog} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {
  petFeatureKey, PetState, selectPetsWithLoading
} from '../pet.reducer';
import {petDeleteAction, petsLoadAction} from '../pet.actions';
import {distinctUntilChanged} from 'rxjs/operators';
import {Pet} from '../pet.types';

interface PetListModel {
  pets: Pet[];
  petsLoading: boolean;
}

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetListComponent implements OnInit {

  model$: Observable<PetListModel>;

  constructor(
    private dialog: MatDialog,
    private store: Store<{ [petFeatureKey]: PetState }>
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(petsLoadAction());

    this.model$ = this.store.pipe(
      select(selectPetsWithLoading),
      // this prevents an error Error: ExpressionChangedAfterItHasBeenCheckedError when animal card opens
      // besides, check here may have a positive effect to the performance along rendering
      distinctUntilChanged(
        (prev, current) => JSON.stringify(prev) === JSON.stringify(current)
      )
    );
  }

  openCard(animal: Partial<Pet>) {
    this.dialog.open(PetCardComponent, {
      width: '70vw',
      maxWidth: '500px',
      data: {id: animal.id}
    });
  }

  delete(animal: Pet) {
    console.log('Wild animal to delete', animal);
    this.store.dispatch(petDeleteAction({id: animal.id}));
  }

  trackByFn(index: number, item: Pet) {
    return item.id;
  }

}
