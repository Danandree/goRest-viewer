import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardDetailsComponent } from '../../components/user-card-details/user-card-details.component';

describe('UserCardDetailsComponent', () => {
  let component: UserCardDetailsComponent;
  let fixture: ComponentFixture<UserCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
