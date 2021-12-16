import { Component, Input, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Article } from '../models/article';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faTimes=faTimes;
  articles:Article[]=[];
  constructor(public mservice:MainService) {
    this.mservice.allArticles().subscribe(res=>
      this.articles=res)
      this.mservice.variableChanged$.subscribe(res=>
        this.articles=res)
}

  ngOnInit(): void {
  }
  searchByCat(param:string){
    this.mservice.onSearchByCat=[true,param];
    this.mservice.onSearchByTag=[false];
    this.mservice.articlesByCat(param).subscribe(res=>
      this.articles=res)
  }
  searchByTag(param:string){
    this.mservice.onSearchByTag=[true,param];
    this.mservice.onSearchByCat=[false];
    this.mservice.articlesByTag(param).subscribe(res=>
      this.articles=res)
  }
close(){
  this.mservice.onSearchByTag=[false];
  this.mservice.onSearchByCat=[false];
  this.mservice.allArticles().subscribe(res=>
    this.articles=res)
}
}
