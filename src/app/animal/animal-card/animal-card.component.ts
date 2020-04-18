import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Animal} from '../animal.types';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {animalFeatureKey, AnimalState, selectAnimal} from '../animal.reducer';
import {animalLoadAction} from "../animal.actions";

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
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private store: Store<{[animalFeatureKey]: AnimalState}>
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.store.dispatch(animalLoadAction({id: this.data.id}));
    }

    this.formGroup = this.fb.group({
      birthday: null,
      species: '',
      vaccinated: false
    });

    this.model$ = this.store.pipe(
      select(selectAnimal),
      tap((animal) => {
        if (!animal) {
          return;
        }
        this.formGroup.patchValue(animal);
        console.log('### this.formGroup.value', this.formGroup.value);
      })
    );
  }

}
