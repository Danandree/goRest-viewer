import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsComponent } from '../../components/lists/lists.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from '../../interfaces/go-rest-apidata-structure';


describe('ListsComponent', () => {
  let component: ListsComponent;
  let fixture: ComponentFixture<ListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ListsComponent,
        HttpClientTestingModule,
        RouterTestingModule,
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define users part', () => {
    component.typeOfObj = 'users';
    expect(component.userPage).toBe(1);
    component.createObj();
    component.loadMore();
    component.goToSearch();
    component.getUsersList();
    component.deleteUser(new User());
    // expect(component.userList.length).toBe(0);
  });

  it('should define posts part', () => {
    component.typeOfObj = 'posts';
    expect(component.userPage).toBe(1);
    component.createObj();
    component.loadMore();
    component.goToSearch();
  });
});
