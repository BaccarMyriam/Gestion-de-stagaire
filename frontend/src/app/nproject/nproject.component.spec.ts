import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NprojectComponent } from './nproject.component';

describe('NprojectComponent', () => {
  let component: NprojectComponent;
  let fixture: ComponentFixture<NprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NprojectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
