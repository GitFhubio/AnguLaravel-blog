import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-update-roles',
  templateUrl: './update-roles.component.html',
  styleUrls: ['./update-roles.component.scss']
})
export class UpdateRolesComponent implements OnInit {
  updatingId:string|null='';
  form : FormGroup;
  roles:string[]=['admin','user','writer','editor'];
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
    constructor(public route:ActivatedRoute,private router:Router,public _http:HttpClient, public mservice:MainService,public fb: FormBuilder) {
      this.route.paramMap.subscribe((params:ParamMap)=>{
        this.updatingId=params.get('id');
      })
        this.form=fb.group({
          'selectedRoles':['']
        })
     }

  ngOnInit(): void {
  }
  onSubmit(){
     console.log(this.form.value);
    this.router.navigate(['/admin']);
  return this._http.put('http://127.0.0.1:8000/api/users/'+this.updatingId,this.form.value,{headers:this.headers}).subscribe((res)=>console.log(res),
  (err) => console.log(err));

}
}
