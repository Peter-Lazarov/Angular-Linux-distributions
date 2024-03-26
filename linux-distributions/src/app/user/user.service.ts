import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { apiObject } from '../../environments/variables';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy{
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  //user = {} as User;
  user: User | undefined;
  userSubscription: Subscription;
  apiUrlUser = apiObject.apiUrl + '/user';

  get isLogged(): boolean {
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

  login(email: string, password: string) {

    return this.http.post<User>(`${this.apiUrlUser}/login`, { email, password })
      .pipe(tap(user => {
        this.user$$.next(user);
      }));
  }

  register(email: string, password: string, rePassword: string, name: string) {
    return this.http.post<User>(`${this.apiUrlUser}/register`, { email, password, rePassword, name })
      .pipe(tap(user => {
        this.user$$.next(user);
      }));;
  }

  logout() {
    return this.http.post(`${this.apiUrlUser}/logout`, {}).pipe(tap(() => {
      this.user$$.next(undefined);
    }));
  }

  getProfile(){
    return this.http.get<User>('/users/profile')
    .pipe(tap((user) => this.user$$.next(user)));
  }

  updateProfile(email: string, name: string){
    return this.http.put<User>('/users/profile', {
      email, name
    }).pipe(tap((user) => this.user$$.next(user)));
  }
}
