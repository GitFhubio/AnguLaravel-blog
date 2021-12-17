import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/main.service';
import { Article } from 'src/app/models/article';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {
  admin:User=new User();
  articles:Article[]=[];

  constructor(public mservice:MainService) {
    this.mservice.getUsers()
    .subscribe(res => {
    this.admin=res.filter(el=>el.id == mservice.current('id'))[0];
    });

    if(mservice.current('roles') != 'superadmin' && mservice.current('roles') != ''){
      this.mservice.allArticles()
    .subscribe(res => {
    this.articles=res.filter(el=>el.user_id==mservice.current('id'));
    });
    }
  }

  ngOnInit(): void {
  }
  delete(article:Article){
    this.articles = this.articles.filter(item => item !== article);

    this.mservice.deleteArticle(article).subscribe();
  }
}
