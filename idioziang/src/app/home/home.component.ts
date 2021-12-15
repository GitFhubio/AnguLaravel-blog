import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Article } from '../models/article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
   articles:Article[]=[];
  constructor(public mservice:MainService) {

    this.mservice.allArticles().subscribe(res=>
      this.articles=res)
  }

  ngOnInit(): void {
  }

}
