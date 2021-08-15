import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateComponentFormComponent } from './generate-component-form.component';

describe('GenerateComponentFormComponent', () => {
  let component: GenerateComponentFormComponent;
  let fixture: ComponentFixture<GenerateComponentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateComponentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateComponentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
