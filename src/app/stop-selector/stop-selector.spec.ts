import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopSelector } from './stop-selector';

describe('StopSelector', () => {
  let component: StopSelector;
  let fixture: ComponentFixture<StopSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
