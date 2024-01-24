import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordAdminSystemComponent } from './dashbord-admin-system.component';

describe('DashbordAdminSystemComponent', () => {
  let component: DashbordAdminSystemComponent;
  let fixture: ComponentFixture<DashbordAdminSystemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashbordAdminSystemComponent]
    });
    fixture = TestBed.createComponent(DashbordAdminSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
