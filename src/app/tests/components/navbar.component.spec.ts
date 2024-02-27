import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent,HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check what page is', () => {
    component.isUserListPage();
    component.isPostListPage();
    expect(component.isUserListPage()).toBeFalse();
  });

  it('should be able to logout', () => {
    component.logout();
    expect(component.isUserLogged()).toBeFalse();
  });
});
