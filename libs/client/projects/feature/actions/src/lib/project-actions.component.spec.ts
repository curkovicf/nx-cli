import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectActionsComponent } from './project-actions.component';

describe('ProjectActionsComponent', () => {
  let component: ProjectActionsComponent;
  let fixture: ComponentFixture<ProjectActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectActionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
