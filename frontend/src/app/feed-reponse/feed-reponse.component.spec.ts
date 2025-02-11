import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedReponseComponent } from './feed-reponse.component';

describe('FeedReponseComponent', () => {
  let component: FeedReponseComponent;
  let fixture: ComponentFixture<FeedReponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedReponseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedReponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
