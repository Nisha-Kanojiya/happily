import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreBenefitsComponent } from './more-benefits.component';

describe('MoreBenefitsComponent', () => {
  let component: MoreBenefitsComponent;
  let fixture: ComponentFixture<MoreBenefitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreBenefitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
