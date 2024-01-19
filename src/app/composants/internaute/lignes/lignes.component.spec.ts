import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LignesComponent } from './lignes.component';

describe('LignesComponent', () => {
  let component: LignesComponent;
  let fixture: ComponentFixture<LignesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LignesComponent]
    });
    fixture = TestBed.createComponent(LignesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
