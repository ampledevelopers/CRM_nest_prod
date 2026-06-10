/* import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if (localStorage.getItem('userToken') !== null) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
}
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
//import { Observable } from 'rxjs/Observable';
import { UserService } from '../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthGuard  {
  constructor(private router: Router, private userService: UserService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
        if (localStorage.getItem('userToken') != null) {
          /* this.userService.getMenuPermission(localStorage.getItem('userRole'), state.url).subscribe((data: any) => {
              if (data.status === 1) {
                  return true;
              } else {
                  localStorage.removeItem('userToken');
                  this.router.navigate(['/login']);
                  return false;
                }
              }, (error: HttpErrorResponse) => {
                  alert('Invalid access attempt');
              }); */

              this.userService.userLogVisit(state.url)
              .subscribe({
                next:(data: any) => {
                // console.log(data);
              },
              error:(error: HttpErrorResponse) => {
                  // alert('Invalid access attempt');
              }});

              return true;
          } else {
              this.router.navigate(['/login']);
              return false;
          }
    }
}
