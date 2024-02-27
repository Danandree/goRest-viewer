import { TestBed } from '@angular/core/testing';

import { AuthService } from '../../auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should logout', () => {
    service.logout();
    expect(service.token).toBeNull();
  });

  it('should check token', () => {
    service.checkToken('token');
    expect(service.token).toEqual('token');
  });

  // it('should try auto login', () => {
  //   service.tryAutoLogin();
  //   expect(service.isLogged).toBeFalsy();
  // });
});
