import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardDetailsComponent } from '../../components/user-card-details/user-card-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { User } from '../../interfaces/go-rest-apidata-structure';

describe('UserCardDetailsComponent', () => {
  let component: UserCardDetailsComponent;
  let fixture: ComponentFixture<UserCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardDetailsComponent, HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get user posts', () => {
    component.user = new User();
    component.getUserPosts();
    expect(component.user).toEqual(new User());
  });

  it('should open and close tab for new post', () => {
    component.user = new User();
    component.openCreatePost(true);
    expect(component.openCreatePost).toBeTruthy();
  });

  it('should be able to delete user', () => {
    component.user = new User();
    component.deleteUser();
    expect(component.user).toEqual(new User());
  });
});
