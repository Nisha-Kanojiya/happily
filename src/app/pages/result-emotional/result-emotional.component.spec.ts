import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultEmotionalComponent } from './result-emotional.component';

describe('ResultEmotionalComponent', () => {
  let component: ResultEmotionalComponent;
  let fixture: ComponentFixture<ResultEmotionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultEmotionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultEmotionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
