import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLibFormComponent } from './new-lib-form.component';

describe('NewLibFormComponent', () => {
  let component: NewLibFormComponent;
  let fixture: ComponentFixture<NewLibFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLibFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLibFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
