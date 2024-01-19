import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonnementDDDComponent } from './abonnement-ddd.component';

describe('AbonnementDDDComponent', () => {
  let component: AbonnementDDDComponent;
  let fixture: ComponentFixture<AbonnementDDDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbonnementDDDComponent]
    });
    fixture = TestBed.createComponent(AbonnementDDDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
