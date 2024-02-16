import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardMinimalComponent } from './user-card-minimal.component';

describe('UserCardMinimalComponent', () => {
  let component: UserCardMinimalComponent;
  let fixture: ComponentFixture<UserCardMinimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardMinimalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCardMinimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
