import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComponentFormComponent } from './new-component-form.component';

describe('GenerateComponentFormComponent', () => {
  let component: NewComponentFormComponent;
  let fixture: ComponentFixture<NewComponentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewComponentFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewComponentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
