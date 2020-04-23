import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs';
import {AnimalCardComponent} from '../animal-card/animal-card.component';
import {MatDialog} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {animalFeatureKey, AnimalState, selectAnimalsWithLoading} from '../../_core/animal/animal.reducer';
import {animalDeleteAction, animalsLoadAction} from '../../_core/animal/animal.actions';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {Animal} from '../../_core/core.types';

interface AnimalListModel {
  animals: Animal[];
  generalAnimals: Animal[];
  wildAnimals: Animal[];
  petAnimals: Animal[];
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
      ),
      map((model) => {
        const {wildAnimals, petAnimals, generalAnimals} = model.animals
          .reduce(
            (acc, animal) => {
              return {
                wildAnimals: animal.iswild ? [...acc.wildAnimals, animal] : acc.wildAnimals,
                petAnimals: animal.ispet ? [...acc.petAnimals, animal] : acc.petAnimals,
                generalAnimals: (!animal.iswild && !animal.ispet)
                  ? [...acc.generalAnimals, animal] : acc.generalAnimals
              }
            },
            {wildAnimals: [], petAnimals: [], generalAnimals: []}
            );

        return {
          ...model,
          wildAnimals,
          petAnimals,
          generalAnimals
        }
      })
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
