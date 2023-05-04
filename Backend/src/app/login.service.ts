import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http:HttpClient) { }
private url="https://localhost:44324/api/UserAccounts/UserLogin";
Authenticate(data :any){
return this.http.post(this.url,data);
}
}
