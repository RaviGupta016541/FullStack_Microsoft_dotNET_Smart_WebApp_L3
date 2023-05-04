import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { ShareDataService } from '../share-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

userDetails:any;
constructor(private service:RegisterService,private shareData:ShareDataService){}

ngOnInit(){
  this.service.getUsers(this.shareData.userId).subscribe(data=>this.userDetails=data);
}
}
