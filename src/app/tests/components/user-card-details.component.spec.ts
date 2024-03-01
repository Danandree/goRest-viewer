import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageComponent } from '../../components/user-page/user-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { User } from '../../interfaces/go-rest-apidata-structure';

describe('UserPageComponent', () => {
  let component: UserPageComponent;
  let fixture: ComponentFixture<UserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPageComponent, HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserPageComponent);
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
