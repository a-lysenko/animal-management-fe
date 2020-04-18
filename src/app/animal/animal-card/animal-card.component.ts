import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Animal} from "../animal.types";
import {Observable, of} from "rxjs";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimalCardComponent implements OnInit {
  formGroup: FormGroup;
  model$: Observable<Animal>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AnimalCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      birthday: null,
      species: '',
      vaccinated: false
    });

    this.model$ = of({
      id: 42,
      birthday: new Date(2016, 2, 3),
      species: 'Bulldog',
      vaccinated: true
    }).pipe(
      tap((animal) => {
        this.formGroup.patchValue(animal);
        console.log('### this.formGroup.value', this.formGroup.value);
      })
    );
  }

}
