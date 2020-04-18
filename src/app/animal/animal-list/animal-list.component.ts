import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from "rxjs";
import {Animal} from "../animal.types";
import {AnimalCardComponent} from "../animal-card/animal-card.component";
import {MatDialog} from "@angular/material/dialog";
import {select, State} from "@ngrx/store";
import {animalFeatureKey, AnimalState, selectAnimals} from "../animal.reducer";

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimalListComponent implements OnInit {

  model$: Observable<Animal[]>

  constructor(
    private dialog: MatDialog,
    private store: State<{ [animalFeatureKey]: AnimalState }>
  ) {
  }

  ngOnInit(): void {
    this.model$ = this.store.pipe(
      select(selectAnimals)
    );
  }

  openCard(animal: Partial<Animal>) {
    console.log('clicked', animal);

    const dialogRef = this.dialog.open(AnimalCardComponent, {
      width: '70vw',
      maxWidth: '500px',
      data: {id: animal.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  delete(animal: Animal) {
    console.log('Animal to delete', animal);
  }

  trackByFn(index: number, item: Animal) {
    return item.id;
  }

}
