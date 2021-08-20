import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNxProjectFormComponent } from './add-nx-project-form.component';

describe('AddNxProjectFormComponent', () => {
  let component: AddNxProjectFormComponent;
  let fixture: ComponentFixture<AddNxProjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNxProjectFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNxProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
