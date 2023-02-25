import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiComponentsDatepickerComponent } from './ui-components-datepicker.component';

describe('UiComponentsDatepickerComponent', () => {
  let component: UiComponentsDatepickerComponent;
  let fixture: ComponentFixture<UiComponentsDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiComponentsDatepickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiComponentsDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
