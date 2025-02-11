import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarqueComponent } from './remarque.component';

describe('RemarqueComponent', () => {
  let component: RemarqueComponent;
  let fixture: ComponentFixture<RemarqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemarqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
