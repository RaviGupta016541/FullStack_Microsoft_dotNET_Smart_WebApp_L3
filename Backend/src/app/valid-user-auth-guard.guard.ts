import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ShareDataService } from './share-data.service';

@Injectable({
  providedIn: 'root'
})
export class ValidUserAuthGuardGuard implements CanActivate {
  constructor( private shareData:ShareDataService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.shareData.isValidUser;
  }

}
