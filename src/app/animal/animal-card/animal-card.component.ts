import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {animalFeatureKey, AnimalState, selectAnimalWithLoading} from '../../_core/animal/animal.reducer';
import {animalAction, animalLoadAction, animalSaveAction} from '../../_core/animal/animal.actions';
import {Animal} from '../../_core/core.types';

interface AnimalCardModel {
  animal: Animal;
  animalLoading: boolean;
}

type FormValue = Omit<Animal, 'id'>;

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimalCardComponent implements OnInit {
  formGroup: FormGroup;
  model$: Observable<AnimalCardModel>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AnimalCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private store: Store<{ [animalFeatureKey]: AnimalState }>
  ) {
  }

  ngOnInit(): void {
    if (this.data && this.data.id != null) {
      this.store.dispatch(animalLoadAction({id: this.data.id}));
    }

    this.formGroup = this.fb.group({
      birthday: null,
      species: '',
      vaccinated: false
    });

    this.model$ = this.store.pipe(
      select(selectAnimalWithLoading),
      tap((model) => {
        const compareValues = (sourceValue: Animal | null, destValue: FormValue) => {
          return sourceValue && Object.entries(destValue).find(
            ([destKey, destItemValue]) => {
              return sourceValue[destKey] !== destItemValue;
            }
          );
        };

        if (compareValues(model.animal, this.formGroup.value)) {
          this.formGroup.patchValue(model.animal);
        }
      })
    );
  }

  cancel() {
    this.executeClose(false);
  }

  save(form: FormGroup & { value: FormValue }, animal: Animal) {
    this.store.dispatch(
      animalSaveAction({
        animal: {
          ...form.value,
          id: animal ? animal.id : null
        },
        successCb: () => {
          this.executeClose(true);
        }
      })
    );
  }

  private executeClose(withSave: boolean) {
    this.dialogRef.close(withSave);
    this.store.dispatch(animalAction(null));
  }

}
