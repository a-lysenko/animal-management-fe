import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {Animal, AnimalId, Owner} from '../../_core/core.types';
import {animalsLoadAction} from '../../_core/animal/animal.actions';
import {animalFeatureKey, AnimalState} from '../../_core/animal/animal.reducer';
import {Pet} from '../pet.types';
import {ownerFeatureKey, OwnerState} from '../../_core/owner/owner.reducer';
import {petFeatureKey, PetState, selectPetModel} from '../pet.reducer';
import {ownersLoadAction} from '../../_core/owner/owner.actions';
import {petAction, petLoadAction, petSaveAction} from '../pet.actions';


interface PetCardModel {
  pet: Pet;
  animalsToSelect: Animal[];
  ownersToSelect: Owner[];
  petLoading: boolean;
  dataLoading: boolean;
}

interface FormValue {
  animal: Animal;
  owner: Owner;
}

@Component({
  selector: 'app-animal-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetCardComponent implements OnInit {
  formGroup: FormGroup;
  model$: Observable<PetCardModel>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PetCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: AnimalId },
    private store: Store<{
      [petFeatureKey]: PetState;
      [animalFeatureKey]: AnimalState;
      [ownerFeatureKey]: OwnerState;
    }>
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(animalsLoadAction());
    this.store.dispatch(ownersLoadAction());

    if (this.data && this.data.id != null) {
      this.store.dispatch(petLoadAction({id: this.data.id}));
    }

    this.formGroup = this.fb.group({
      animal: null,
      owner: null
    });

    let ownerWasPatched = false;
    let animalWasPatched = false;

    this.model$ = this.store.pipe(
      select(selectPetModel),
      tap((model) => {

        if (!animalWasPatched && model.pet) {
          this.formGroup.get('animal').setValue(
            {
              id: model.pet.animalid,
              birthday: model.pet.birthday,
              species: model.pet.species,
              vaccinated: model.pet.vaccinated
            }
          );
          animalWasPatched = true;
        }

        if (!ownerWasPatched && model.pet) {
          this.formGroup.get('owner').setValue(
            {
              id: model.pet.ownerid,
              fullname: model.pet.fullname
            }
          );
          ownerWasPatched = true;
        }
      })
    );
  }

  cancel() {
    this.executeClose(false);
  }

  save(form: FormGroup & { value: FormValue }, animal: Pet) {
    this.store.dispatch(
      petSaveAction({
        pet: {
          id: animal ? animal.id : null,
          animalid: form.value.animal.id,
          ownerid: form.value.owner.id
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
    this.store.dispatch(petAction(null));
  }

}
