import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import {CustomvalidationService} from '../../services/custom-validation.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  flagLogout = false;
  storeLoginData: any;
  userId: number;
  constructor(private router: Router,
              private customvalidationService: CustomvalidationService,
              private apiService: ApiService) { }

  ngOnInit() {
    this.customvalidationService.getLoginStatus().subscribe((data) => {
      this.flagLogout = data;
    });
    try {
      this.storeLoginData = localStorage.getItem('happily_user');
      if (this.storeLoginData) {
        this.userId = JSON.parse(localStorage.getItem('happily_user')).userId;
        this.flagLogout = true;
      }
    } catch (error) {
      console.log(error);
    }
  }

 

  async resultPopup() {
    if (this.flagLogout) {
      try {
        const data = await this.apiService.get('get-happiness-index/'  + this.userId);
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

  supportPopup() {
    if (this.flagLogout) {
      this.router.navigateByUrl('/pages/support');
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
          localStorage.removeItem('temp_pinCode');
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
