import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCardComponent } from '../../components/post-card/post-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { User, Post } from '../../interfaces/go-rest-apidata-structure';



describe('PostCardComponent', () => {
  let component: PostCardComponent;
  let fixture: ComponentFixture<PostCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostCardComponent,HttpClientTestingModule],
      providers: [provideAnimations()]
    })
    .compileComponents();
    fixture = TestBed.createComponent(PostCardComponent);
    component = fixture.componentInstance;

    component.post = new Post();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change comment component status', () => {
    component.changeCommentComponentStatus(true);
    expect(component.isCommentComponentOpen).toBeTruthy();
  });

});
