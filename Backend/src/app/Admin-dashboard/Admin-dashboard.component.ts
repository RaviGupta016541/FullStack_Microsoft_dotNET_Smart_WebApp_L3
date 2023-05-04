import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators} from "@angular/forms"
import { RegisterService } from '../register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Admin-dashboard',
  templateUrl: './Admin-dashboard.component.html',
  styleUrls: ['./Admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private toastr: ToastrService,private fb:FormBuilder,private service:RegisterService) {
  }

  formValue !: FormGroup;
  UsersData :any;
  showAdd!:boolean;
  showUpdate!:boolean;
  isReadOnly=false;
  onEdit(row:any){
    var ask=true;
    if(ask)
    {
      this.service.freezeUnfreezeUser(row).subscribe(Response=>{console.log(Response);

      });
      this.toastr.success('change updated.','Success!');
      this.ngOnInit()
    }
  }
  deleteUser(row:any){
    var ask=confirm("Do you want to delete this account ?")
    if(ask)
    {
      this.service.deleteUsers(row).subscribe();
      this.toastr.success('deleted successfully.','Success!');
      this.ngOnInit()
    }
  }
    ngOnInit(): void {
      this.formValue=this.fb.group({
        userName:["",Validators.required],
        accountNumber:["",Validators.required],
        accountBalance:["",Validators.required],
        location:["",Validators.required],
        phone:["",Validators.required],
        isFreeze:["",Validators.required],
        isAdmin:["",Validators.required],
        createdDate:["",Validators.required]
      })
      this.getAllUser();
    }

    getAllUser()
    {
      this.service.getAllUsers()
      .subscribe(res=>{
        this.UsersData=res;
        console.log(res);
      })
    }



}
