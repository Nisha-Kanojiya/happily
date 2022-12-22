import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class CustomvalidationService {

    private isLoggedIn = new BehaviorSubject<boolean>(false);
    // patternValidator(): ValidatorFn {
    //     return (control: AbstractControl): { [key: string]: any } => {
    //         if (!control.value) {
    //             return null;
    //         }
    //         const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
    //         const valid = regex.test(control.value);
    //         return valid ? null : { invalidPassword: true };
    //     };
    // }

    MatchPassword(password: string, confirmPassword: string) {
        return (formGroup: FormGroup) => {
            const passwordControl = formGroup.controls[password];
            const confirmPasswordControl = formGroup.controls[confirmPassword];

            if (!passwordControl || !confirmPasswordControl) {
                return null;
            }

            if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
                return null;
            }

            if (passwordControl.value !== confirmPasswordControl.value) {
                confirmPasswordControl.setErrors({ passwordMismatch: true });
            } else {
                confirmPasswordControl.setErrors(null);
            }
        };
    }

    userNameValidator(userControl: AbstractControl) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (this.validateUserName(userControl.value)) {
                    resolve({ userNameNotAvailable: true });
                } else {
                    resolve(null);
                }
            }, 1000);
        });
    }

    validateUserName(userName: string) {
        const UserList = ['ankit', 'admin', 'user', 'superuser'];
        return (UserList.indexOf(userName) > -1);
    }

    setLoginStatus(data): void {
        this.isLoggedIn.next(data);
      }

      getLoginStatus(): Observable<boolean> {
        return this.isLoggedIn;
      }

}
