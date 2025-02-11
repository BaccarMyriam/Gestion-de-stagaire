import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUserComponent } from './contact-user.component';

describe('ContactUserComponent', () => {
  let component: ContactUserComponent;
  let fixture: ComponentFixture<ContactUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
