import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveProjectFormComponent } from './move-project-form.component';

describe('MoveProjectFormComponent', () => {
  let component: MoveProjectFormComponent;
  let fixture: ComponentFixture<MoveProjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveProjectFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
