import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs/Rx';

import { FormValue, State } from './value-conversion.reducer';

@Component({
  selector: 'ngf-value-conversion',
  templateUrl: './value-conversion.component.html',
  styleUrls: ['./value-conversion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValueConversionPageComponent {
  formState$: Observable<FormGroupState<FormValue>>;

  reducerCode = `
import { Action } from '@ngrx/store';
import {
  createFormGroupState,
  formGroupReducer,
  FormGroupState,
} from 'ngrx-forms';

export interface FormValue {
  date: string;
}

export const FORM_ID = 'valueConversion';

export const INITIAL_STATE = createFormGroupState<FormValue>(FORM_ID, {
  date: '',
});

export const reducers = {
  formState(s = INITIAL_STATE, a: Action) {
    return formGroupReducer(s, a);
  },
};
  `;

  componentCode = `
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroupState, NgrxValueConverters } from 'ngrx-forms';

import { FormValue } from '../value-conversion.reducer';

@Component({
  selector: 'ngf-value-conversion-example',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValueConversionFormComponent {
  @Input() formState: FormGroupState<FormValue>;

  dateToISOString = NgrxValueConverters.dateToISOString;
}
  `;

  componentHtml = `
<form>
  <div>
    <mat-form-field>
      <input matInput
             [matDatepicker]="picker"
             placeholder="Date"
             [ngrxFormControlState]="formState.controls.date"
             [ngrxValueConverter]="dateToISOString">
      <mat-datepicker-toggle matSuffix
                             [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>
  </div>
</form>
  `;

  constructor(store: Store<State>) {
    this.formState$ = store.select(s => s.valueConversion.formState);
  }
}
