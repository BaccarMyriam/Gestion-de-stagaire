import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortflioComponent } from './portflio.component';

describe('PortflioComponent', () => {
  let component: PortflioComponent;
  let fixture: ComponentFixture<PortflioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortflioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortflioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
