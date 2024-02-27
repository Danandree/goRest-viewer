import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommentComponent } from '../../components/create-comment/create-comment.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';



describe('CreateCommentComponent', () => {
  let component: CreateCommentComponent;
  let fixture: ComponentFixture<CreateCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCommentComponent,HttpClientTestingModule],
      providers: [provideAnimations()]
    })
    .compileComponents();
  

    fixture = TestBed.createComponent(CreateCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a comment', () => {
    expect(component.createComment).toBeTruthy();
    expect(component.controlGroup.valid).toBeFalse();
    component.controlGroup.setValue({
      body: "body",
      name: "name",
      email: "email"
    });
    component.createComment();
  });
});
