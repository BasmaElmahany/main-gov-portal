import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderProfileComponent } from './leader-profile.component';

describe('LeaderProfileComponent', () => {
  let component: LeaderProfileComponent;
  let fixture: ComponentFixture<LeaderProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
