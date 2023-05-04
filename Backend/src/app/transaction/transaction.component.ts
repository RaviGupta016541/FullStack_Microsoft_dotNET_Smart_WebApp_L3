import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../share-data.service';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

constructor(private service:TransactionService,public shareData:ShareDataService) { }

  public allTransaction=[] as any;

public more=false;
  ngOnInit(){
  this.service.GetAllTransactionByAccountNumber(this.shareData.AccountNumber).subscribe(data=>this.allTransaction = data);
  }
}
