import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MainService } from '../main.service';
import { Article } from '../models/article';
import { fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  hideme:any={};
  show:boolean=false;
  faUser=faUser;
  article:Article=new Article(
  )
  constructor(private _http:HttpClient,public mservice:MainService,public route:ActivatedRoute) {
  this.article.comments=[];
  this.mservice.showArticle(this.route.snapshot.params.id).subscribe(res=>
  this.article=res
 )
  }

  ngOnInit(): void {
  }
  sendMessage(e:HTMLInputElement){

 let mymessage= {'body':e.value,
'article_id':this.route.snapshot.params.id,
'auth_id':this.mservice.current('id')
};
 this.article.comments.push(mymessage);
 this._http.post('http://127.0.0.1:8000/api/comments',mymessage).subscribe((res)=>console.log(res),
 (err) => console.log(err));
  e.value='';
  }
  sendReply(e:HTMLInputElement, c:any){

    let mymessage= {'body':e.value,
   'comment_id':c.id,
   'auth_id':this.mservice.current('id')
   };
   this.article.comments.forEach(element => {
     if(element.id == c.id){
    element.replies.push(mymessage);
     }
   });

    this._http.post('http://127.0.0.1:8000/api/replies',mymessage).subscribe((res)=>console.log(res),
    (err) => console.log(err));
     e.value='';
     }

}
