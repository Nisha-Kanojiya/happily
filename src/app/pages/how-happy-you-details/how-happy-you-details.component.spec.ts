import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowHappyYouDetailsComponent } from './how-happy-you-details.component';

describe('HowHappyYouDetailsComponent', () => {
  let component: HowHappyYouDetailsComponent;
  let fixture: ComponentFixture<HowHappyYouDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowHappyYouDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowHappyYouDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
