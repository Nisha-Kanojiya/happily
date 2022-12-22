import { Component, OnInit } from '@angular/core';
import { FormsService } from '../../services/form-service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Md5 } from 'ts-md5/dist/md5';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LogInComponent implements OnInit {

  loginForm: FormGroup;
  loginObj: any;
  storeValue: any;
  message: any;
  submitted: boolean = false;z
  sendBtnDisabled = false;
  public imageLoader:boolean = false;

  constructor(public formService: FormsService,
              private formBuilder: FormBuilder,
              private apiService: ApiService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      // email: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', Validators.required],
      pinCode: ['', [Validators.required, Validators.minLength(6)]]
    });
    try {
      if (localStorage.getItem('happily_user')) {
        this.router.navigateByUrl('/question-page');
      }
    } catch (error) {
      console.log(error);
    }
  }
  get pinCode() {
    return this.loginForm.get('pinCode');
  }
  get password() {
    return this.loginForm.get('password');
  }
  get loginFormControl() {
    return this.loginForm.controls;
  }
  async onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      // if (this.loginForm.value.password) {
      //   this.loginForm.value.password = Md5.hashStr(this.loginForm.value.password);
      // }
      this.sendBtnDisabled = true;
      try {
        this.imageLoader = true;
        const data = await this.apiService.post('user/login', this.loginForm.value);
        console.log(data)
        this.imageLoader = false;
        this.loginObj = data.results;
        this.message = data.statusMessage;
        if (data.statusMessage && data.statusMessage === 'Success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login Successfully!',
            showConfirmButton: false,
            timer: 2000
          });

          
          localStorage.setItem('happily_user', JSON.stringify(this.loginObj));


          const resultdata = await this.apiService.get('get-happiness-index/'  + this.loginObj.userId);
          console.log(resultdata)
          if (resultdata.statusCode == "HP407") {
            this.router.navigateByUrl('/question-page');
          }
          else{
            if(localStorage.getItem('happily_user') !== '' || localStorage.getItem('happily_user') !== undefined) {
            this.storeValue = JSON.parse(localStorage.getItem('happily_user'));
            this.router.navigateByUrl('/result');
          }
        }
          this.loginForm.reset();
          localStorage.removeItem('tempUserDetails');
          localStorage.removeItem('user_pin');
        } else if (data.statusMessage && data.statusMessage !== 'Success') {
          if (data.statusCode && data.statusCode === 'HP999') {
            Swal.fire({
              position: 'center',
              icon: 'error',
              // tslint:disable-next-line:max-line-length
              title: 'Refreshing page is taking too long. Please click on OK, move out of this page, and return to try again. Or try closing browser and re-opening the website. Sorry for the inconvenience.',
              showConfirmButton: true,
              // timer: 2000
            });
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: this.message,
              showConfirmButton: true,
              // timer: 2000
            });
          }
          this.message = data.error;
          this.sendBtnDisabled = false;
        }
      } catch (error) {
        this.message = error;
        console.log(this.message);
      }
  } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        // tslint:disable-next-line:max-line-length
        title: 'Incorrect or incomplete information. Contact Us for help if you forgot password.  We cannot retrieve your privacy protected user name or PIN CODE.  If you forgot them, then you will have to re-register.',
        showConfirmButton: true,
        // timer: 2000
      });
      this.sendBtnDisabled = false;
    }
  }

}
