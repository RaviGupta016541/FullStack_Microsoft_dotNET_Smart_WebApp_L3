import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { ShareDataService } from '../share-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
constructor(private toastr: ToastrService,private service:RegisterService,private route:Router,private shareData:ShareDataService){
}

  public resetForm = new FormGroup({
    oldPassword: new FormControl("", [Validators.required]),
    newPassword: new FormControl("", [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
    confirmPassword: new FormControl("", [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ])
  });

  get oldPassword(): FormControl{
    return this.resetForm.get("oldPassword") as FormControl;
  }
  get newPassword(): FormControl{
    return this.resetForm.get("newPassword") as FormControl;
  }
  get confirmPassword(): FormControl{
    return this.resetForm.get("confirmPassword") as FormControl;
  }
  onSubmit()
  {
    if(this.newPassword.value!==this.confirmPassword.value){
      this.toastr.error('password is not equal to confirm password.','Error!');
    }
    else{
    this.service.resetPassword(this.shareData.AccountNumber,this.oldPassword.value,this.newPassword.value).subscribe(res => {console.log(res);
      this.toastr.success(res,'Success!');
      this.route.navigate(['home'])
    },
    (error)=>{console.log(error);
      this.toastr.error(error,'Error!');
    }
    );

  }
  }
}

