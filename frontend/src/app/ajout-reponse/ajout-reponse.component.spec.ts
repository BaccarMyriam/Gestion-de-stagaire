import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutReponseComponent } from './ajout-reponse.component';

describe('AjoutReponseComponent', () => {
  let component: AjoutReponseComponent;
  let fixture: ComponentFixture<AjoutReponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutReponseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutReponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
