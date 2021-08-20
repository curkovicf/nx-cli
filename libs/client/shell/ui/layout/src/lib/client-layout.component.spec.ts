import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLayoutComponent } from './client-layout.component';

describe('LayoutComponent', () => {
  let component: ClientLayoutComponent;
  let fixture: ComponentFixture<ClientLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientLayoutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
