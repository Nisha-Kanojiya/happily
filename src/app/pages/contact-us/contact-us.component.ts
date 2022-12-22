import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { FormsService } from '../../services/form-service';
import Swal from 'sweetalert2';
import * as $ from 'jquery';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  contactObj: any;
  message: any;
  submitted: boolean = false;
  public imageLoader:boolean = false;

  constructor(public formService: FormsService,
              private formBuilder: FormBuilder,
              private apiService: ApiService) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      // tslint:disable-next-line:max-line-length
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[A-Za-z]{1}[a-z0-9._%+-]+@[a-z0-9.-]+\\.[cominorgcc]{2,4}$')]],
      contact: ['', [Validators.required, Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')]],
      name: [''],
      message: ['', Validators.required]
    });

    // Restricts input for each element in the set of matched elements to the given inputFilter.
    (function($) {
  $.fn.inputFilter = function(inputFilter) {
    return this.on('input keydown keyup mousedown mouseup select contextmenu drop', function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty('oldValue')) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = '';
      }
    });
  };
}($));


// Install input filters.
    $('#intTextValue').inputFilter(function(value) {
    return /^-?\d*[+,]?\d*$/.test(value); });

  }
  get contact() {
    return this.contactForm.get('contact');
  }
  get contactFormControl() {
    return this.contactForm.controls;
  }
  async onSubmit() {
    this.submitted = true;
    if (this.contactForm.valid) {
    try {
      this.imageLoader = true;
      let data = await this.apiService.post('contactus', this.contactForm.value);
      this.imageLoader = false;
      this.contactObj = data.results;
      this.message = data.statusMessage;
      if (data.statusMessage && data.statusMessage === 'Success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Submit Details Successfully!',
          showConfirmButton: false,
          timer: 2000
        });
        this.contactForm.reset();
      } else if (data.statusMessage && data.statusMessage !== 'Success') {
        if (data.statusCode && data.statusCode === 'HP999') {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Refreshing page is taking too long. Please click on OK, move out of this page, and return to try again. Or try closing browser and re-opening the website. Sorry for the inconvenience.',
            showConfirmButton: true,
            // timer: 2000
          });
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: this.message,
            showConfirmButton: false,
            timer: 2000
          });
        }
        this.message = data.error;
        this.contactForm.reset();

      }

    } catch (error) {
      console.log(error);
      this.message = error;
      console.log(this.message);
    }
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      // tslint:disable-next-line:max-line-length
      title: 'Incorrect or incomplete information.',
      showConfirmButton: true,
      // timer: 2000
    });
  }
  }
}
