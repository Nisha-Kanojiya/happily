import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss']
})
export class SolutionsComponent implements OnInit {
  userID: any;
  constructor(private router: Router) {
  }

  ngOnInit() {
    try {
      if (localStorage.getItem("happily_user")) {
        this.userID = JSON.parse(localStorage.getItem("happily_user")).user.id;
      }
    } catch (error) {
      console.log(error);
    }
  }

 

}
