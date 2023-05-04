import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { ShareDataService } from '../share-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {
  constructor(private toastr: ToastrService,private register:RegisterService,private route:Router,public shareData:ShareDataService) { }


  registerForm = new FormGroup({
    userName: new FormControl('',[
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z].*')
    ]),
    accountNumber: new FormControl("",[Validators.required,Validators.minLength(8),
      Validators.maxLength(10) ]),

    password: new FormControl("",[
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),

    rpassword: new FormControl("",[Validators.required,
    Validators.minLength(6),
    Validators.maxLength(15)]),
    accountBalance: new FormControl("",[Validators.required]),
    location: new FormControl("",[Validators.required]),
    phone: new FormControl("",[Validators.required,Validators.minLength(10)])

  });

  registerSubmitted()
  {
   console.log(this.registerForm.value)
   if(this.password.value!==this.rpassword.value){
    this.toastr.error('password is not equal to confirm password.','Error!');
        }
        else{
          this.register.sendUser(this.registerForm.value).subscribe();
          this.toastr.success('Your Account Created.','Success!');
          this.route.navigate(['/login']);
        }
  }

  get userName(): FormControl{
    return this.registerForm.get("userName") as FormControl;
  }
  get accountNumber(): FormControl{
    return this.registerForm.get("accountNumber") as FormControl;
  }
  get password(): FormControl{
    return this.registerForm.get("password") as FormControl;
  }
  get rpassword(): FormControl{
    return this.registerForm.get("rpassword") as FormControl;
  }
  get accountBalance(): FormControl{
    return this.registerForm.get("accountBalance") as FormControl;
  }
  get location(): FormControl{
    return this.registerForm.get("location") as FormControl;
  }
  get phone(): FormControl{
    return this.registerForm.get("phone") as FormControl;
  }

}
