import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordPrincipaleComponent } from './dashbord-principale.component';

describe('DashbordPrincipaleComponent', () => {
  let component: DashbordPrincipaleComponent;
  let fixture: ComponentFixture<DashbordPrincipaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbordPrincipaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashbordPrincipaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
