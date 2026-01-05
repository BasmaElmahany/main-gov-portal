import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoratesDetailsComponent } from './directorates-details.component';

describe('DirectoratesDetailsComponent', () => {
  let component: DirectoratesDetailsComponent;
  let fixture: ComponentFixture<DirectoratesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectoratesDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DirectoratesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
