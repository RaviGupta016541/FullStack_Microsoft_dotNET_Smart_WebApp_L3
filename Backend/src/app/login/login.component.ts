import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { ShareDataService } from '../share-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route:Router, private toastr: ToastrService,private login:LoginService,public shareData:ShareDataService) { }
  ngOnInit(): void {
  }

  public loginForm = new FormGroup({
    accountNumber: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ])
  });

  get accountNumber(): FormControl{
    return this.loginForm.get("accountNumber") as FormControl;
  }
  get password(): FormControl{
    return this.loginForm.get("password") as FormControl;
  }

  onSubmit()
  {
      this.login.Authenticate(this.loginForm.value).subscribe(
    (res: any)=>{
        if(res.status=="success"){
          this.shareData.isValidUser=true;
          this.shareData.isAdmin=res.isAdmin;
          this.shareData.userName=res.userName;
          this.shareData.userId=res.userId;
          this.shareData.AccountNumber=res.accountNumber;
          this.toastr.success('Login successful.','Success!');
          this.route.navigate(['home'])
        }
        else if(res.status=="freezed"){
          this.toastr.warning('Your Account is freezed contact to your branch manager.','Warning!');
          this.loginForm.reset({});
        }
        else{
          this.toastr.error('You are not a valid user.','Error!');
          this.loginForm.reset();
        }
      }
    )
  }


}
