import { Component } from '@angular/core';
import { ShareDataService } from '../share-data.service';
import { TransactionService } from '../transaction.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private toastr: ToastrService,private account:TransactionService,public shareData:ShareDataService){

  }
  accountBalance:number=-1;

  CheckBalance(){
 this.account.GetAccountBalance(this.shareData.AccountNumber).subscribe(
  (res:any)=>{
    console.log(res)
    if(res.value.message=="success"){
      this.accountBalance=res.value.accountBalance;
    }

  }
 );
  }

  chequeBook(){
    this.toastr.info('Request added for cheque book.','Information!');
  }
}
