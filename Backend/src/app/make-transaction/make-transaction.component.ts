import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShareDataService } from '../share-data.service';
import { TransactionService } from '../transaction.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-make-transaction',
  templateUrl: './make-transaction.component.html',
  styleUrls: ['./make-transaction.component.css']
})
export class MakeTransactionComponent {

  public sendMoneyForm = new FormGroup({
    FromAccountNumber:new FormControl(this.shareData.AccountNumber),
    ToAccountNumber: new FormControl("", [Validators.required,Validators.minLength(6),
      Validators.maxLength(15)]),
    Amount: new FormControl("", [Validators.required,Validators.max(100000),Validators.min(1)])
  });


  constructor(private toastr: ToastrService,private service:TransactionService,private shareData:ShareDataService){}

  get ToAccountNumber(): FormControl{
    return this.sendMoneyForm.get("ToAccountNumber") as FormControl;
  }
  get Amount(): FormControl{
    return this.sendMoneyForm.get("Amount") as FormControl;
  }

  onSubmit()
  {
    console.log(this.sendMoneyForm.value)
      this.service.MakeTransaction(this.sendMoneyForm.value).subscribe(
    (res: any)=>{
        if(res=="success"){
          this.toastr.success('Transection successful.','Success!');
          this.sendMoneyForm.reset();
        }
        else{
          this.toastr.error('Transection failed.','Error!');
        }
      },
      (error)=>{
        this.toastr.error(error,'Error!');
      }
    )
  }}


