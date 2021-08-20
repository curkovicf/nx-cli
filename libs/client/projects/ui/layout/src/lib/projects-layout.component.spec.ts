import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsLayoutComponent } from './projects-layout.component';

describe('HomeLayoutComponent', () => {
  let component: ProjectsLayoutComponent;
  let fixture: ComponentFixture<ProjectsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsLayoutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
