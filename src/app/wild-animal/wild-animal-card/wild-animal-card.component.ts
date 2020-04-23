import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {
  wildAnimalFeatureKey,
  WildAnimalState,
  selectWildAnimalModel
} from '../wild-animal.reducer';
import {wildAnimalAction, wildAnimalLoadAction, wildAnimalSaveAction} from '../wild-animal.actions';
import {WildAnimal} from '../wild-animal.types';
import {Animal, AnimalId} from '../../_core/core.types';
import {animalFeatureKey, AnimalState} from '../../_core/animal/animal.reducer';
import {animalsLoadAction} from '../../_core/animal/animal.actions';

interface AnimalCardModel {
  wildAnimal: WildAnimal;
  animalsToSelect: Animal[];
  wildAnimalLoading: boolean;
  dataLoading: boolean;
}

interface FormValue {
  animal: Animal;
  trackingid: number;
}

@Component({
  selector: 'app-animal-card',
  templateUrl: './wild-animal-card.component.html',
  styleUrls: ['./wild-animal-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WildAnimalCardComponent implements OnInit {
  formGroup: FormGroup;
  model$: Observable<AnimalCardModel>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<WildAnimalCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: AnimalId },
    private store: Store<{
      [wildAnimalFeatureKey]: WildAnimalState
      [animalFeatureKey]: AnimalState
    }>
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(animalsLoadAction());

    if (this.data && this.data.id != null) {
      this.store.dispatch(wildAnimalLoadAction({id: this.data.id}));
    }

    this.formGroup = this.fb.group({
      animal: null,
      trackingid: null
    });

    let wasPatched = false;

    this.model$ = this.store.pipe(
      select(selectWildAnimalModel),
      tap((model) => {
        const compareValues = (sourceValue: WildAnimal | null, destValue: FormValue) => {
          return sourceValue && Object.entries(destValue).find(
            ([destKey, destItemValue]) => {
              return sourceValue[destKey] !== destItemValue;
            }
          );
        };

        if (!wasPatched && model.wildAnimal) {
          this.formGroup.get('animal').setValue(
            {
              id: model.wildAnimal.animalid,
              birthday: model.wildAnimal.birthday,
              species: model.wildAnimal.species,
              vaccinated: model.wildAnimal.vaccinated
            }
          );
          this.formGroup.get('animal').disable();
          this.formGroup.get('trackingid').setValue(model.wildAnimal.trackingid);
          wasPatched = true;
        }
      })
    );
  }

  cancel() {
    this.executeClose(false);
  }

  save(form: FormGroup & { value: FormValue }, animal: WildAnimal) {
    this.store.dispatch(
      wildAnimalSaveAction({
        wildAnimal: {
          id: animal ? animal.id : null,
          animalid: animal ? animal.animalid : form.value.animal.id,
          trackingid: form.value.trackingid,
        },
        successCb: () => {
          this.executeClose(true);
        }
      })
    );
  }

  compareWithFn(o1: Animal, o2: Animal) {
    return o1 != null && o2 != null && o1.id === o2.id;
  }

  private executeClose(withSave: boolean) {
    this.dialogRef.close(withSave);
    this.store.dispatch(wildAnimalAction(null));
  }

}
