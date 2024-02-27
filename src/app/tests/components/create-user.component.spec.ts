import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserComponent } from '../../components/create-user/create-user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';



describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUserComponent,HttpClientTestingModule],
      providers: [provideAnimations()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
