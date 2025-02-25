import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResltadminComponent } from './resltadmin.component';

describe('ResltadminComponent', () => {
  let component: ResltadminComponent;
  let fixture: ComponentFixture<ResltadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResltadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResltadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
