import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from '../share-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route:Router,public shareData:ShareDataService,private toastr: ToastrService){}
  ngOnInit(): void {
  }
  Logout(){
    this.shareData.isValidUser=false;
    this.shareData.isAdmin=false;
    this.shareData.userId=0;
    this.shareData.userName="";
    this.toastr.info('You are logged out.');
    this.route.navigate(['home']);
  }
}
