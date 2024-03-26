import { ValidatorFn } from "@angular/forms";

export function passwordsCompare(passwordOneControlName: string, passwordTwoControlName: string): ValidatorFn {
    return (control) => {
        const passwordOneControlObject = control.get(passwordOneControlName);
        const passwordTwoControlObject = control.get(passwordTwoControlName);

        //console.log({ passwordOneValue: passwordOneControlObject, passwordTwoValue: passwordTwoControlObject });

        const isTheSame = passwordOneControlObject?.value == passwordTwoControlObject?.value;
        //console.log(isTheSame);

        return isTheSame ? null : { passwordsCompare: true };
    };
}
