import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component
import {CustomvalidationService} from './services/custom-validation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HAPPILY';
  storeLoginData: any;
  constructor(private bnIdle: BnNgIdleService,
              private router: Router,
              private route: ActivatedRoute,
              private customvalidationService: CustomvalidationService) {
    this.bnIdle.startWatching(1 * 60 * 60).subscribe((res) => {
      if (res) {
          console.log('session expired');
          this.customvalidationService.setLoginStatus(false);
          localStorage.removeItem('user_pin');
          localStorage.removeItem('temp_pinCode');
          localStorage.removeItem('happily_user');
          this.router.navigateByUrl('');
      }
    });

  }
  onActivate(event) {
    window.scroll(0, 0);
}

public doUnload(): void {
  // Clear session or do something
  // localStorage.removeItem('user_pin');
  // localStorage.removeItem('happily_user');
  this.logout();
}

public logout() {
  if (!confirm('Are you sure you want to logout')) {
    return;
  }
  try {
    this.storeLoginData = localStorage.getItem('happily_user');
    localStorage.removeItem('user_pin');
    localStorage.removeItem('temp_pinCode');
    localStorage.removeItem('happily_user');
    this.router.navigateByUrl('/login');
  } catch (error) {
  }
}


}
