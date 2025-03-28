import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTransaccionesComponent } from './view-transacciones.component';

describe('ViewTransaccionesComponent', () => {
  let component: ViewTransaccionesComponent;
  let fixture: ComponentFixture<ViewTransaccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTransaccionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTransaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
