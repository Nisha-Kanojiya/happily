import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-more-benefits',
  templateUrl: './more-benefits.component.html',
  styleUrls: ['./more-benefits.component.scss']
})
export class MoreBenefitsComponent implements OnInit {
  flagLogout = false;
  storeLoginData: any;
  constructor(private router: Router) { }

  ngOnInit() {
    try {
      this.storeLoginData = localStorage.getItem('happily_user');
      if (this.storeLoginData) {
        this.flagLogout = true;
      }
    } catch (error) {
      console.log(error);
    }
  }

}
