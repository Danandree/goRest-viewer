import { TestBed } from '@angular/core/testing';

import { GoRestAPIService } from '../../services/go-rest-api.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Comment, Post, User } from '../../interfaces/go-rest-apidata-structure';
// import { USERS } from '../../mockData/users';

describe('GoRestAPIService', () => {
  let service: GoRestAPIService;

  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GoRestAPIService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get resources', () => {
    service.getUsersList(1, 3).subscribe((users: any) => {
      expect(users).toBeTruthy();
      expect(users.length).toBe(3);
    });
    let mockReq = testingController.expectOne(`https://gorest.co.in/public/v2/users?page=1&per_page=3`);
    expect(mockReq.request.method).toEqual('GET');
    service.getPostsList(1, 3).subscribe((posts: any) => {
      expect(posts).toBeTruthy();
      expect(posts.length).toBe(3);
    });
    // mockReq = testingController.expectOne(`https://gorest.co.in/public/v2/posts?page=1&per_page=3`);
    // expect(mockReq.request.method).toEqual('GET');
    service.getUserPosts(0).subscribe((posts: any) => {
      expect(posts).toBeTruthy();
      expect(posts.length).toBe(0);
    });
    // mockReq = testingController.expectOne(`https://gorest.co.in/public/v2/users/0/posts`);
    // expect(mockReq.request.method).toEqual('GET');
    service.searchObject('','users','',0,0).subscribe((posts: any) => {
      expect(posts).toBeTruthy();
      expect(posts.length).toBe(0);
    });
    // mockReq = testingController.expectOne(`https://gorest.co.in/public/v2/users/0/posts`);
    // expect(mockReq.request.method).toEqual('GET');
  });

  it('should post and delete resources', () => {
    // let mockReq = testingController.expectOne('');
    service.createUser(new User()).subscribe((user: any) => {
      expect(user).toBeTrue();
    });
    let mockReq = testingController.expectOne(`https://gorest.co.in/public/v2/users`);
    expect(mockReq.request.method).toEqual('POST');
    service.createPost(new Post()).subscribe((post: any) => {
      expect(post).toBeTruthy();
    });
    service.createComment(new Comment()).subscribe((comment: any) => {
      expect(comment).toBeTruthy();
    });
    service.deleteUserById(0).subscribe((data: any) => {
      expect(data).toBeTruthy();
    });
  });

});
