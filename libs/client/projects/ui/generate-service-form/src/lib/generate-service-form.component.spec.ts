import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateServiceFormComponent } from './generate-service-form.component';

describe('GenerateServiceFormComponent', () => {
  let component: GenerateServiceFormComponent;
  let fixture: ComponentFixture<GenerateServiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateServiceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
