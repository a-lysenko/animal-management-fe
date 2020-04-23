import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs';
import {WildAnimalCardComponent} from '../wild-animal-card/wild-animal-card.component';
import {MatDialog} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {
  WildAnimalState,
  selectWildAnimalsWithLoading,
  wildAnimalFeatureKey
} from '../wild-animal.reducer';
import {wildAnimalDeleteAction, wildAnimalsLoadAction} from '../wild-animal.actions';
import {distinctUntilChanged} from 'rxjs/operators';
import {WildAnimal} from '../wild-animal.types';

interface WildAnimalListModel {
  wildAnimals: WildAnimal[];
  wildAnimalsLoading: boolean;
}

@Component({
  selector: 'app-wild-animal-list',
  templateUrl: './wild-animal-list.component.html',
  styleUrls: ['./wild-animal-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WildAnimalListComponent implements OnInit {

  model$: Observable<WildAnimalListModel>;

  constructor(
    private dialog: MatDialog,
    private store: Store<{ [wildAnimalFeatureKey]: WildAnimalState }>
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(wildAnimalsLoadAction());

    this.model$ = this.store.pipe(
      select(selectWildAnimalsWithLoading),
      // this prevents an error Error: ExpressionChangedAfterItHasBeenCheckedError when animal card opens
      // besides, check here may have a positive effect to the performance along rendering
      distinctUntilChanged(
        (prev, current) => JSON.stringify(prev) === JSON.stringify(current)
      )
    );
  }

  openCard(animal: Partial<WildAnimal>) {
    this.dialog.open(WildAnimalCardComponent, {
      width: '70vw',
      maxWidth: '500px',
      data: {id: animal.id}
    });
  }

  delete(animal: WildAnimal) {
    console.log('Wild animal to delete', animal);
    this.store.dispatch(wildAnimalDeleteAction({id: animal.id}));
  }

  trackByFn(index: number, item: WildAnimal) {
    return item.id;
  }

}
