import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatedTextComponent } from './repeated-text.component';

describe('RepeatedTextComponent', () => {
  let component: RepeatedTextComponent;
  let fixture: ComponentFixture<RepeatedTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepeatedTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatedTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
