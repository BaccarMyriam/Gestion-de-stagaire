import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatprojetComponent } from './etatprojet.component';

describe('EtatprojetComponent', () => {
  let component: EtatprojetComponent;
  let fixture: ComponentFixture<EtatprojetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtatprojetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtatprojetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
