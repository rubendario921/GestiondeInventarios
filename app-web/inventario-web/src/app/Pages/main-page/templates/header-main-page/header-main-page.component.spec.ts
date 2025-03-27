import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMainPageComponent } from './header-main-page.component';

describe('HeaderMainPageComponent', () => {
  let component: HeaderMainPageComponent;
  let fixture: ComponentFixture<HeaderMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderMainPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
