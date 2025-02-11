import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutRemarqueComponent } from './ajout-remarque.component';

describe('AjoutRemarqueComponent', () => {
  let component: AjoutRemarqueComponent;
  let fixture: ComponentFixture<AjoutRemarqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutRemarqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutRemarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
