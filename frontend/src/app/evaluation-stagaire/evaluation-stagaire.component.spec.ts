import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationStagaireComponent } from './evaluation-stagaire.component';

describe('EvaluationStagaireComponent', () => {
  let component: EvaluationStagaireComponent;
  let fixture: ComponentFixture<EvaluationStagaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluationStagaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluationStagaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
