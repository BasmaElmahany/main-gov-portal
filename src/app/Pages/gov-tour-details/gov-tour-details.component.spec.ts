import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovTourDetailsComponent } from './gov-tour-details.component';

describe('GovTourDetailsComponent', () => {
  let component: GovTourDetailsComponent;
  let fixture: ComponentFixture<GovTourDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GovTourDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GovTourDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
