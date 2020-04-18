import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Observable, of} from "rxjs";
import {Animal} from "../animal.types";
import {AnimalCardComponent} from "../animal-card/animal-card.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimalListComponent implements OnInit {

  model$: Observable<Animal[]>
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.model$ = of([
      {
        birthday: new Date(2015, 1, 2),
        species: 'Mastiff',
        vaccinated: false
      },
      {
        birthday: new Date(2016, 2, 3),
        species: 'Bulldog',
        vaccinated: true
      },
      {
        birthday: new Date(2012, 5, 15),
        species: 'Poodle',
        vaccinated: false
      }
    ].map((item, id) => ({id, ...item})));
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
