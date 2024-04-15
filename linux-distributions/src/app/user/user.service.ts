import { Injectable, OnDestroy } from '@angular/core';
import { User, UserForAuthenticated } from '../types/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, catchError, tap, throwError } from 'rxjs';
//import { apiObject } from '../../environments/variables';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject$$ = new BehaviorSubject<UserForAuthenticated | undefined>(undefined);
  //private user$ = this.userSubject$$.asObservable();

  userObject: UserForAuthenticated | undefined;
  isUserLoaded = false;

  constructor(private http: HttpClient) {
  }

  get isLogged(): boolean {
    //console.log('user service !!this.user ' + !!this.user);

    return !!this.userSubject$$.value;
  }

  get user$(): Observable<UserForAuthenticated | undefined> {
    return this.userSubject$$.asObservable();
  }

  login(email: string, password: string) {

    return this.http.post<UserForAuthenticated>(`/api/user/login`, { email, password })
      .pipe(tap(user => {
        this.userSubject$$.next(user);
      }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    //`Backend returned code ${error.status}, body was: ${error.error}`;

    return throwError(error.error.error);
  }

  register(email: string, password: string, rePassword: string, name: string) {
    return this.http.post<User>(`/api/user/register`, { email, password, rePassword, name })
      .pipe(tap(user => {
        this.userSubject$$.next(user);
      }),
        catchError(this.handleError)
      );
  }

  logout() {
    return this.http.post(`/api/user/logout`, {}).pipe(tap(() => {
      this.userSubject$$.next(undefined);
    }));
  }

  getProfile() {
    return this.http.get<User>('/api/user/profile')
      .pipe(
        tap((user) => {
          this.userSubject$$.next(user)
          this.isUserLoaded = true;
        })
      );
  }

  updateProfile(email: string, name: string) {
    return this.http.put<User>('/api/user/profile', {
      email, name
    }).pipe(tap((user) => this.userSubject$$.next(user)));
  }

  getUserName(userId: string): Observable<string> {
    return this.http.get<string>(`/api/user/${userId}/name`);
  }
}
