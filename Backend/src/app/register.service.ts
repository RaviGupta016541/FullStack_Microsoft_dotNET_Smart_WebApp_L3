import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private url="https://localhost:44324/api/UserAccounts";

  constructor(private http:HttpClient) { }
  sendUser(data:any){
return this.http.post(this.url,data,{responseType:'text'}).pipe(
  catchError(this.handleError)
);
  }
  getAllUsers(){
return this.http.get(this.url);
  }
  getUsers(id:any){
return this.http.get(this.url+'/'+id);
  }
  deleteUsers(id:any){
return this.http.delete(this.url,id);
  }
  freezeUnfreezeUser(id:any){
    console.log(id);
    return this.http.get("https://localhost:44324/api/UserAccounts/FreezeUnFreeze/"+id);
  }

  resetPassword(AccountNumber:any,oldPassword:any,newPassword:any){
    return this.http.get("https://localhost:44324/api/UserAccounts/ResetPassword/"+AccountNumber+"/"
    +oldPassword+"/"+newPassword,{responseType:'text'}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(()=>error.error);
    // return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
