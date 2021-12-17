import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MainService } from '../main.service';
import { Article } from '../models/article';
import { Category } from '../models/category';
import { Tag } from '../models/tag';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{
  article:Article | undefined;
  updatingId:string|null = '';
  form : FormGroup;
  newCategories:string[]=[];
  newTags:string[]=[];
  fileName:string = 'Choose file...';  // oppure fileName?:string;
  file: any|null;
  error:boolean = false;
  categories:Category[]=new Array();
  tags:Tag[]=new Array();
  constructor(public route:ActivatedRoute,private _http: HttpClient,private title:Title, private meta:Meta,public fb: FormBuilder,public router:Router,public mservice:MainService){
    this.title.setTitle("Creation form");
    this.meta.updateTag({name:'description',content:"questa è la pagina di creazione"});
    this.meta.updateTag({name:'keywords',content:"create,insert,new"});
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.updatingId=params.get('idA');
    })
    this.form=fb.group({
      'title':['',Validators.required],
      'content':['',Validators.required],
      'file':[''],
      'selectedCategories':['']
    })
  }

  ngOnInit() : void {
    if (this.updatingId != null){
      this.mservice.allArticles().subscribe(res=>{
      this.article=res.filter(el => el.id == this.updatingId)[0];
      this.form.patchValue(this.article);
      }
      )
      }
     this.mservice.allCategories().subscribe(res=>this.categories=res)

  }


addToList(string:string,input:HTMLInputElement){
  if (string == 'c'){
    let catnames=new Array();
  this.categories.forEach(element => {
    catnames.push(element.name);
  });
  if(input.value!='' && !catnames.includes(input.value))
  this.newCategories.push(input.value);
}
if(string == 't'){
  let tagnames=new Array();
  this.tags.forEach(element => {
    tagnames.push(element.name);
  });
  if(input.value!='' && !tagnames.includes(input.value))
  this.newTags.push(input.value);
}
}
removeItem(string:string,input:any){
if (string == 'c'){
this.newCategories = this.newCategories.filter(item => item!== input.innerHTML);
}
if (string == 't'){
  this.newTags = this.newTags.filter(item => item!== input.innerHTML);
}
}
  // private headers = new HttpHeaders({'Content-Type': 'application/json'})
  // private headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data'}) //da problemi,
  //non metto headers con multipart form data
onFileSelect(e:any) {
  this.fileName = e.target.files[0].name;
  this.file = e.target.files[0];
  console.log(this.fileName,this.file);
}
onSubmit(){
  const formData: FormData = new FormData();
  // console.log(this.file);
  console.log(this.form.value);
  formData.append('myform',JSON.stringify(this.form.value));
  formData.append('id',this.mservice.current('id') as string);
  // formData.append('id','2'); //test
  // if(this.newCategories.length>0){
    formData.append('newCategories',JSON.stringify(this.newCategories));
  // }
  // if(this.newTags.length>0){
    formData.append('newTags',JSON.stringify(this.newTags));
  // }
  if(this.file!= null){
  formData.append('image', this.file,this.fileName);
  }
  if (this.form.valid){
    this.error=false;
    this.router.navigate(['/admin']);
  if(this.article == undefined) {
  return this._http.post('http://127.0.0.1:8000/api/articles',formData).subscribe((res)=>console.log(res),
  (err) => console.log(err));}
  else{
    formData.append('_method', 'PUT');
    return this._http.post('http://127.0.0.1:8000/api/articles/'+this.updatingId,formData).subscribe((res)=>console.log(res),
    (err) => console.log(err));}

} else{
   this.error=true;
  return;
}
}
  checkString(input:string){
    let tag=this.form.controls[input];
    if(tag.value.length>=250){
      tag.setErrors({incorrect:true});
    } else{
      tag.setErrors(null);
    }
  }
}
