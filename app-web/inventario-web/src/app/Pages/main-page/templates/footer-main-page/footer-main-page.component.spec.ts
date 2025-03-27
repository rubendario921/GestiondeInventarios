import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterMainPageComponent } from './footer-main-page.component';

describe('FooterMainPageComponent', () => {
  let component: FooterMainPageComponent;
  let fixture: ComponentFixture<FooterMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterMainPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
