import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovToursComponent } from './gov-tours.component';

describe('GovToursComponent', () => {
  let component: GovToursComponent;
  let fixture: ComponentFixture<GovToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GovToursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GovToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
