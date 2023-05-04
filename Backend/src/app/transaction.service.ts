import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(public http:HttpClient) { }
private url="https://localhost:44324/api/TransactionDetails";

MakeTransaction(data :any){
return this.http.post(this.url,data,{responseType:'text'}).pipe(catchError(this.handleError));
}

GetAllTransaction(){
return this.http.get(this.url);
}

GetAllTransactionByAccountNumber(accountNumber:any){
return this.http.get("https://localhost:44324/api/TransactionDetails/GetTransactionByAccountNumber/"+accountNumber);
}

GetAccountBalance(accountNumber:any){
return this.http.get("https://localhost:44324/api/UserAccounts/getAccountBalance?AccountNumber="+accountNumber);
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
