import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/main.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {
users:User[]=[];
form : FormGroup;
roles:string[]=['admin','user','writer','editor'];
private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private router:Router,public _http:HttpClient, public mservice:MainService,public fb: FormBuilder) {

    this.mservice.getUsers()
      .subscribe(res => {
        this.users = res;
        console.log(this.users);
      });
      this.form=fb.group({
        'selectedRoles':['']
      })
   }

    ngOnInit(): void {
    }

}
