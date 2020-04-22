import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs';
import {AnimalCardComponent} from '../animal-card/animal-card.component';
import {MatDialog} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {animalFeatureKey, AnimalState, selectAnimalsWithLoading} from '../animal.reducer';
import {animalDeleteAction, animalsLoadAction} from '../animal.actions';
import {distinctUntilChanged} from 'rxjs/operators';
import {Animal} from '../../_core/core.types';

interface AnimalListModel {
  animals: Animal[];
  animalsLoading: boolean;
}

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimalListComponent implements OnInit {

  model$: Observable<AnimalListModel>;

  constructor(
    private dialog: MatDialog,
    private store: Store<{ [animalFeatureKey]: AnimalState }>
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(animalsLoadAction());

    this.model$ = this.store.pipe(
      select(selectAnimalsWithLoading),
      // this prevents an error Error: ExpressionChangedAfterItHasBeenCheckedError when animal card opens
      // besides, check here may have a positive effect to the performance along rendering
      distinctUntilChanged(
        (prev, current) => JSON.stringify(prev) === JSON.stringify(current)
      )
    );
  }

  openCard(animal: Partial<Animal>) {
    this.dialog.open(AnimalCardComponent, {
      width: '70vw',
      maxWidth: '500px',
      data: {id: animal.id}
    });
  }

  delete(animal: Animal) {
    console.log('Animal to delete', animal);
    this.store.dispatch(animalDeleteAction({id: animal.id}));
  }

  trackByFn(index: number, item: Animal) {
    return item.id;
  }

}
