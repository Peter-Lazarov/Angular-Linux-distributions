import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { UserService } from "../user/user.service";
import { Observable, filter, interval, map, of, switchMap, tap, timeInterval, timeout, timer } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({ providedIn: 'root' })

export class AuthenticationActivate implements CanActivate {
    constructor(private userService: UserService, private cookieService: CookieService) { }

    //fist way
    // canActivate(route: ActivatedRouteSnapshot, 
    //     state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //     debugger
    //     //console.log("Guard AuthenticationActivate " + this.userService.isLogged);

    //     return this.userService.isLogged;
    // }

    // //second way
    // canActivate(route: ActivatedRouteSnapshot,
    //     state: RouterStateSnapshot): Observable<boolean> {
    //     if (this.userService.isUserLoaded) {
    //         //console.log("Guard AuthenticationActivate 1 " + this.userService.isLogged);
    //         return this.userService.user$.pipe(
    //             map(user => !!user)
    //         );
    //     } else {
    //         // Set a timeout of 1000 or 2000 milliseconds
    //         return timer(100).pipe(
    //             switchMap(() => this.userService.user$.pipe(
    //                 map(user => !!user)
    //             ))
    //         );
    //     }
    // }

    canActivate(): Observable<boolean> {
        if (!this.cookieService.check('authorisation')) {
            return of(false);
        }

        if (this.userService.isUserLoaded) {
            return this.userService.user$.pipe(
                map(user => !!user)
            );
        }
        else {
            return interval(100).pipe(
                //tap(() => console.log('4 Checking if user is loaded: ', this.userService.isUserLoaded)),            
                filter(() => this.userService.isUserLoaded),
                switchMap(() => this.userService.user$.pipe(
                    map(user => !!user)
                ))
            );
        }
    }
}
