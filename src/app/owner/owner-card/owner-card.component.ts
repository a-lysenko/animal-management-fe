import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {ownerFeatureKey, OwnerState, selectOwnerWithLoading} from '../../_core/owner/owner.reducer';
import {ownerAction, ownerLoadAction, ownerSaveAction} from '../../_core/owner/owner.actions';
import {tap} from 'rxjs/operators';
import {Owner} from '../../_core/core.types';

interface OwnerCardModel {
  owner: Owner;
  ownerLoading: boolean;
}

type FormValue = Omit<Owner, 'id' | 'addressid'>;

@Component({
  selector: 'app-owner-card',
  templateUrl: './owner-card.component.html',
  styleUrls: ['./owner-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OwnerCardComponent implements OnInit {

  formGroup: FormGroup;
  model$: Observable<OwnerCardModel>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OwnerCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private store: Store<{ [ownerFeatureKey]: OwnerState }>
  ) {
  }

  ngOnInit(): void {
    if (this.data && this.data.id != null) {
      this.store.dispatch(ownerLoadAction({id: this.data.id}));
    }

    this.formGroup = this.fb.group({
      fullname: '',
      city: '',
      country: '',
      street: '',
      zipcode: ''
    });

    this.model$ = this.store.pipe(
      select(selectOwnerWithLoading),
      tap((model) => {
        const compareValues = (sourceValue: Owner | null, destValue: FormValue) => {
          return sourceValue && Object.entries(destValue).find(
            ([destKey, destItemValue]) => {
              return sourceValue[destKey] !== destItemValue;
            }
          );
        };

        if (compareValues(model.owner, this.formGroup.value)) {
          this.formGroup.patchValue(model.owner);
        }
      })
    );
  }

  cancel() {
    this.executeClose(false);
  }

  save(form: FormGroup & { value: FormValue }, owner: Owner) {
    this.store.dispatch(
      ownerSaveAction({
        owner: {
          ...form.value,
          id: owner ? owner.id : null,
          addressid: owner ? owner.id : null
        },
        successCb: () => {
          this.executeClose(true);
        }
      })
    );
  }

  private executeClose(withSave: boolean) {
    this.dialogRef.close(withSave);
    this.store.dispatch(ownerAction(null));
  }

}
