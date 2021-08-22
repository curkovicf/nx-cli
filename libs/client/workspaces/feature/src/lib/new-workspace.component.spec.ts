import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWorkspaceComponent } from './new-workspace.component';

describe('AddNxProjectFormComponent', () => {
  let component: NewWorkspaceComponent;
  let fixture: ComponentFixture<NewWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewWorkspaceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
