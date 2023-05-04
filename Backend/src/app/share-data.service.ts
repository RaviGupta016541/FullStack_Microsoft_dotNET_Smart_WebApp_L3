import {  Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService  {

  public isAdmin:boolean=false;
  public isValidUser:boolean=false;
  public userName:string="";
  public userId: any;
  AccountNumber: any;
  
}
