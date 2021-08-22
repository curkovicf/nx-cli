import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameProjectFormComponent } from './rename-project-form.component';

describe('RenameProjectFormComponent', () => {
  let component: RenameProjectFormComponent;
  let fixture: ComponentFixture<RenameProjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenameProjectFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenameProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
