import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';
import { INPUT_DEBOUNCE_TIME } from '../constants';

interface IValidationError {
  name: string;
  value: any;
}

@Component({
  selector: 'base-input',
  templateUrl: './base-input.component.html',
  styleUrls: ['./base-input.component.scss']
})
export class BaseInputComponent implements OnInit {

  input: FormControl = new FormControl();

  @Input() id: string = 'input_id';
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() name: string = 'input_name';
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() prefixIcon: string = '';
  @Input() suffixIcon: string = 'cancel';
  @Input() debounceTime: number = INPUT_DEBOUNCE_TIME;
  @Input() validators: ValidatorFn[] = [];
  @Input() asyncValidators: AsyncValidatorFn[] = [];
  
  @Output() prefixClick = new EventEmitter<void>();
  @Output() suffixClick = new EventEmitter<void>();

  get error(): string {
    if (this.input.invalid) {
      const error = this._getValidationErrors(this.input).shift();
      if (error) {
        let msg: string = '';
        switch (error.name) {
          case 'required': msg = "The field is required"; break;
          case 'pattern': msg = `The value does't meet the pattern ${error.value.requiredPattern}`; break;
          case 'email': msg = "Invalid email address"; break;
          case 'minlength': msg = `The value must be at least ${error.value.requiredLength} characters long`; break;
          case 'maxlength': msg = `The value must be less than ${error.value.requiredLength} characters`; break;
          case 'max': msg = `The value must be less than ${error.value.max}`; break;
          case 'min': msg = `The value must be more than ${error.value.min}`; break;
          default: msg = "The value is invalid";
        }
        return msg;
      }
    }
    return '';
  }
    
  constructor () { }

  ngOnInit(): void {
    this.input = new FormControl(this.value, this.validators, this.asyncValidators);
  }

  onPrefixClick() {
    this.prefixClick.emit();
  }

  onSuffixClick() {
    this.suffixIcon === "cancel" ?
      this.input.setValue('') :
      this.suffixClick.emit();
  }

  private _getValidationErrors(control: FormControl) {
    let errors: IValidationError[] = [];
    const controlErrors = control.errors;
    if (controlErrors !== null) {
      Object.keys(controlErrors).forEach(keyError => {
        errors.push({name: keyError, value: controlErrors[keyError]});
      });
    }
    return errors;
  }
}
