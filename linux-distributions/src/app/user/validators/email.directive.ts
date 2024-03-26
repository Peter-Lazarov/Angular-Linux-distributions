import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appEmail]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EmailDirective,
    multi: true
  }]
})
export class EmailDirective implements Validator, OnChanges {
  @Input() inputEmailField: string = '';
  constructor() { }

  validatorFunction: ValidatorFn = () => null;

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    //console.log('in validate control', control);
    return this.validatorFunction(control);
  }
  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error('Method not implemented.');
  // }

  emailValidator(): ValidatorFn {
    //const domainsString = domains.join('|');

    //^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$
    const regexForEmail = new RegExp(`^([a-zA-Z0-9._%-]+@gmail\.(com|bg))$`);

    return (control) => {
      //console.log(domainsString);
      //console.log(control.value);

      const isValid = control.value !== '' && regexForEmail.test(control.value);

      //console.log('email validate ' + isValid, 'input ' + control.value);
      return isValid ? null: { emailValidator: true }; //this is used to show error text so the logic is reversed
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { currentValue } = changes['inputEmailField'];
    //console.log('const { currentValue } = changes[inputEmailField];', currentValue);
    
    if (currentValue?.length) {
      this.validatorFunction = this.emailValidator();
      //console.log('const { currentValue } = changes[inputEmailField];', currentValue);
    }
  }
}
