import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSelectorSpecialRandomComponent } from './word-selector-special-random.component';

describe('WordSelectorSpecialRandomComponent', () => {
  let component: WordSelectorSpecialRandomComponent;
  let fixture: ComponentFixture<WordSelectorSpecialRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordSelectorSpecialRandomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WordSelectorSpecialRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
