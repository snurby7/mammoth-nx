import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  const subscriptions: Subscription[] = [];
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: {
            isAuthenticated$: new BehaviorSubject(true),
          },
        },
      ],
    });
    authGuard = TestBed.inject(AuthGuard);
  });

  afterEach(() => {
    subscriptions.forEach((sub) => sub.unsubscribe());
  });

  it('should call the login method if not logged in', () => {
    const authService = TestBed.inject(AuthService);
    authService.isAuthenticated$ = new BehaviorSubject(false);
    authService.login = jest.fn();
    (authGuard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    ) as Observable<boolean>).subscribe();
    expect(authService.login).toHaveBeenCalled();
  });

  it('should not call the login method if logged in', () => {
    const authService = TestBed.inject(AuthService);
    authService.isAuthenticated$ = new BehaviorSubject(true);
    authService.login = jest.fn();
    (authGuard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    ) as Observable<boolean>).subscribe();
    expect(authService.login).not.toHaveBeenCalled();
  });
});
