import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionesPageComponent } from './transacciones-page.component';

describe('TransaccionesPageComponent', () => {
  let component: TransaccionesPageComponent;
  let fixture: ComponentFixture<TransaccionesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransaccionesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransaccionesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
