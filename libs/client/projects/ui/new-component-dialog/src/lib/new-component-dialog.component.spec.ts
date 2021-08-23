import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComponentDialogComponent } from './new-component-dialog.component';

describe('GenerateComponentFormComponent', () => {
  let component: NewComponentDialogComponent;
  let fixture: ComponentFixture<NewComponentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewComponentDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewComponentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
