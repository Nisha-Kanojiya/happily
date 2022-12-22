import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import Swal from 'sweetalert2';
import { CountryList } from '../../../assets/files/country';
// import { ReCaptcha2Component } from 'ngx-captcha';
import { CustomvalidationService } from 'src/app/services/custom-validation.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  registrationForm: FormGroup;
  message: string;
  storeValue: any;
  checkedSelect: boolean;
  submitted: boolean = false;
  sendBtnDisabled = false;
  countryData: any = [];
  public imageLoader:boolean = false;
  siteKey = '6Ldg3pcaAAAAAE89Ora1N_nGCirVd4xi_iSzekCA';

  // @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  // @ViewChild('langInput') langInput: ElementRef;

  // public captchaIsLoaded = false;
  // public captchaSuccess = false;
  // public captchaIsExpired = false;
  // public captchaResponse?: string;

  // public theme: 'light' | 'dark' = 'light';
  // public size: 'compact' | 'normal' = 'normal';
  // public lang = 'en';
  // public type: 'text' | 'audio';

  constructor(private customValidator: CustomvalidationService,
              private formBuilder: FormBuilder,
              private apiService: ApiService,
              private router: Router) {
              this.countryData = CountryList;
              }

  ngOnInit() {
    
    if (localStorage.getItem('happily_user')) {
      this.router.navigateByUrl('/welcome-user');
    }

    this.registrationForm = this.formBuilder.group({
      recaptcha: [''],
      pinCode: ['', [Validators.required, Validators.minLength(6)]],
      // currentCountry: ['', Validators.required],
       terms: [''],
      // email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required], this.customValidator.userNameValidator.bind(this.customValidator)],
      // password: ['', [Validators.required, Validators.minLength(8)]],
      // confirmPassword: ['', [Validators.required]],
    },
      // {
      //   validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      // }
    );
  }

  handleSuccess(data) {
    console.log(data);
  }
  get pinCode() {
    return this.registrationForm.get('pinCode');
  }
  // get password() {
  //   return this.registrationForm.get('password');
  // }
  get registerFormControl() {
    return this.registrationForm.controls;
  }

  async onSubmit() {
    this.submitted = true;
    
    if (this.registrationForm.valid) {
        // this.registrationForm.value.password = Md5.hashStr(this.registrationForm.value.password);
        // this.registrationForm.value.confirmPassword = Md5.hashStr(this.registrationForm.value.confirmPassword);
        if (!this.registrationForm.value.terms) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Must agree to Terms and Conditions.',
              showConfirmButton: true,
              // timer: 2000
            });
          } else {
            this.sendBtnDisabled = true;
            try {
              this.imageLoader = true;
              let data = await this.apiService.post('user/signup', this.registrationForm.value);
              const signupObj = data.results;
              this.imageLoader = false;
              this.message = data.statusMessage;
              if (data.statusMessage && data.statusMessage === 'Success') {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Sign Up is successful. You can give a test now.',
                  showConfirmButton: false,
                  timer: 2000
                });

                localStorage.setItem('happily_user', JSON.stringify(signupObj));

                console.log(data)
                this.router.navigateByUrl('/question-page');
              } else if (data.statusMessage && data.statusMessage !== 'Success') {
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: this.message,
                  showConfirmButton: true,
                  // timer: 2000
                });
                this.message = data.Error;
                this.sendBtnDisabled = false;
              }
            } catch (error) {
              this.message = error.error;
            }
          }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Incomplete information or passwords not matching!',
        showConfirmButton: true,
        // timer: 2000
      });
      this.sendBtnDisabled = false;
    }
  }

}
