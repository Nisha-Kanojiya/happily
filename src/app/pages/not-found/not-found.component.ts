import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import {CustomvalidationService} from '../../services/custom-validation.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  flagLogout = false;
  storeLoginData: any;
  pinID: number;
  constructor(private router: Router,
              private customvalidationService: CustomvalidationService,
              private apiService: ApiService) { }

  ngOnInit() {
    this.customvalidationService.getLoginStatus().subscribe((data) => {
      console.log(!data);
      this.flagLogout = data;
    });
    try {
      this.storeLoginData = localStorage.getItem('happily_user');
      if (this.storeLoginData) {
        this.pinID = JSON.parse(localStorage.getItem('happily_user')).user.pinCode;
        this.flagLogout = true;
      }
    } catch (error) {
      console.log(error);
    }
  }


 
  async resultPopup() {
    if (this.flagLogout) {
      try {
        const data = await this.apiService.get('get-happiness-index/'  + this.pinID);
        if (data.statusMessage && data.statusMessage === 'Success') {
          this.router.navigateByUrl('/result');
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: data.statusMessage,
            showConfirmButton: true,
            // timer: 2000
          });
          this.router.navigateByUrl('/privacy-protected-test');
        }
      } catch (error) {
        console.log(error.error);
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Available only to members. Please sign up, or login if you are a member.',
        showConfirmButton: true,
        // timer: 2000
      });
    }
  }
 
  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll($event) {
  //   if (window.pageYOffset > 0) {
  //         const element = document.getElementById('mainNav');
  //         console.log('resolve', element);
  //         element.classList.add('sticky');
  //       } else {
  //         const element = document.getElementById('mainNav');
  //         console.log('reject', element);
  //         element.classList.remove('sticky');
  //       }
  // }
  logout() {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Are you sure you want to Logout!',
      showConfirmButton: true,
      showCancelButton: true,
      // timer: 2000
    }).then((res) => {

      if (res.value) {
        try {
          this.storeLoginData = localStorage.getItem('happily_user');
          localStorage.removeItem('tempUserDetails');
          localStorage.removeItem('user_pin');
          localStorage.removeItem('happily_user');
          this.flagLogout = false;
          this.logoutData();
          this.router.navigate(['/login']);
    } catch (error) {
    }
    } else {

      }
    });
  }

  async logoutData() {
    try {
      const groupData = await this.apiService.post('user/logout', {});
      if (groupData.statusMessage && groupData.statusMessage === 'Success') {
        const Response = groupData.results;
      }
    } catch (error) {
      console.log(error.error);
    }
  }
}
