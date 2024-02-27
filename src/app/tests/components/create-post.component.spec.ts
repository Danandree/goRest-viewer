import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostComponent } from '../../components/create-post/create-post.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';



describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePostComponent,HttpClientTestingModule],
      providers: [provideAnimations()]
    })
    .compileComponents();
    
    // component.userId = 1;

    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a post', () => {
    component.createPost();
    component.controlGroup.get('user_id')?.setValue('1');
    component.controlGroup.get('title')?.setValue('title');
    component.controlGroup.get('body')?.setValue('body');
    component.createPost();
  });

  it('should clear a post', () => {
    component.clearPost();
    component.userId = 1;
    component.clearPost();  
  });
});
