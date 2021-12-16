import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { Article } from '../models/article';
import { Category } from '../models/category';
import { Tag } from '../models/tag';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  categories:Category[]=[];
  tags:Tag[]=[];
  constructor(public http:HttpClient,public mservice:MainService,public router:Router) {
   this.mservice.allCategories().subscribe(res=>
    this.categories=res)
    this.mservice.allTags().subscribe(res=>
      this.tags=res)
   }
   searchByCat(param:string){
    this.mservice.onSearchByCat=[true,param];
    this.mservice.onSearchByTag=[false];
    this.mservice.articlesByCat(param).subscribe(res=>
      this.mservice.changeVariable(res))
    this.router.navigate(['/']);
  }
  searchByTag(param:string){
    this.mservice.onSearchByTag=[true,param];
    this.mservice.onSearchByCat=[false];
    this.mservice.articlesByTag(param).subscribe(res=>
      this.mservice.changeVariable(res))
      this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }

}
