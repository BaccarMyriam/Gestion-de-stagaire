import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbackComponent } from './fback.component';

describe('FbackComponent', () => {
  let component: FbackComponent;
  let fixture: ComponentFixture<FbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FbackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
