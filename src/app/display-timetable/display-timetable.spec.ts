import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTimetable } from './display-timetable';

describe('DisplayTimetable', () => {
  let component: DisplayTimetable;
  let fixture: ComponentFixture<DisplayTimetable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayTimetable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayTimetable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
