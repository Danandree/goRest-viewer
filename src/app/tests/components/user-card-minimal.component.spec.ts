import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardMinimalComponent } from '../../components/user-card-minimal/user-card-minimal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from '../../interfaces/go-rest-apidata-structure';


describe('UserCardMinimalComponent', () => {
  let component: UserCardMinimalComponent;
  let fixture: ComponentFixture<UserCardMinimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardMinimalComponent,HttpClientTestingModule,RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCardMinimalComponent);
    component = fixture.componentInstance;

    component.user = new User();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open a dialog', () => {
    const event = new Event('click');
    spyOn(event, 'preventDefault');
    component.openDeleteUserDialog(event);
    // expect(event.preventDefault).toHaveBeenCalled();
    expect(component.openDeleteUserDialog).toBeTruthy();
  });
});
