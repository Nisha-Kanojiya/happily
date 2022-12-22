import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-happy-you-details',
  templateUrl: './how-happy-you-details.component.html',
  styleUrls: ['./how-happy-you-details.component.scss']
})
export class HowHappyYouDetailsComponent implements OnInit {
  public imageLoader:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
