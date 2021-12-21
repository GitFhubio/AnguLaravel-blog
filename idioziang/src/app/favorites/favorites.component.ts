import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Article } from '../models/article';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  articles:Article[]=[];
  constructor(public mservice:MainService,public http:HttpClient) {
    this.mservice.allArticles().subscribe(res=>{
      this.articles=res.filter(el=>mservice.myfavorites.includes(el.id)),
      console.log(this.articles);
    }
      )
}

  ngOnInit(): void {
  }

}
