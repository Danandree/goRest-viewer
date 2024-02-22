import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostComponent } from '../../components/create-post/create-post.component';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
