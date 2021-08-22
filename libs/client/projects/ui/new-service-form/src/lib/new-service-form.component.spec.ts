import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewServiceFormComponent } from './new-service-form.component';

describe('GenerateServiceFormComponent', () => {
  let component: NewServiceFormComponent;
  let fixture: ComponentFixture<NewServiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewServiceFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
