import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../types/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, catchError, tap, throwError } from 'rxjs';
//import { apiObject } from '../../environments/variables';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  //private user$ = this.user$$.asObservable();

  //user = {} as User;
  user: User | undefined;
  userSubscription: Subscription;
  //apiUrlUser = apiObject.apiUrl + '/user';

  get isLogged(): boolean {
    //console.log('user service !!this.user ' + !!this.user);

    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  get user$(): Observable<User | undefined> {
    return this.user$$.asObservable();
  }

  login(email: string, password: string) {

    return this.http.post<User>(`/api/user/login`, { email, password })
      .pipe(tap(user => {
        this.user$$.next(user);
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
        this.user$$.next(user);
      }),
        catchError(this.handleError)
      );
  }

  logout() {
    return this.http.post(`/api/user/logout`, {}).pipe(tap(() => {
      this.user$$.next(undefined);
    }));
  }

  getProfile() {
    return this.http.get<User>('/api/user/profile')
      .pipe(tap((user) => this.user$$.next(user)));
  }

  updateProfile(email: string, name: string) {
    return this.http.put<User>('/api/user/profile', {
      email, name
    }).pipe(tap((user) => this.user$$.next(user)));
  }

  getUserName(userId: string): Observable<string> {
    return this.http.get<string>(`/api/user/${userId}/name`);
  }
}
