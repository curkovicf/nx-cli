import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemBadgeComponent } from './list-item-badge.component';

describe('ListItemBadgeComponent', () => {
  let component: ListItemBadgeComponent;
  let fixture: ComponentFixture<ListItemBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
