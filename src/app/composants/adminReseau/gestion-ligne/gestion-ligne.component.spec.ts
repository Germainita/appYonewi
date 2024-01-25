import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionLigneComponent } from './gestion-ligne.component';

describe('GestionLigneComponent', () => {
  let component: GestionLigneComponent;
  let fixture: ComponentFixture<GestionLigneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionLigneComponent]
    });
    fixture = TestBed.createComponent(GestionLigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
