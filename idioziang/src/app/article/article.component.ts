import { HttpClient } from '@angular/common/http';
import { faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { MainService } from '../main.service';
import { Article } from '../models/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  hideme:any={};
  show:boolean=false;
  faUser=faUser;
  faHeart=faHeart;
  article:Article=new Article(
  )
  constructor(private _http:HttpClient,public mservice:MainService,public route:ActivatedRoute,public router:Router) {
  this.article.comments=[];
  this.mservice.showArticle(this.route.snapshot.params.id).subscribe(res=>{
  this.article=res;
  }
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
    //  articles/{id}/favoritesDown
     addRemoveFavorites(){
       if(!JSON.parse(localStorage.getItem('myfavorites')!).includes(this.article.id) ){
        this.mservice.myfavorites.push(this.article.id);
        localStorage.setItem('myfavorites',JSON.stringify(this.mservice.myfavorites));
        this.article.likes++;
        this._http.post('http://127.0.0.1:8000/api/articles/'+this.article.id+'/favoritesUp',{data:this.article.likes}).subscribe((res)=>console.log(res),
        (err) => console.log(err));
       } else {
        this.mservice.myfavorites=this.mservice.myfavorites.filter((el:any)=> el != this.article.id);
        localStorage.setItem('myfavorites',JSON.stringify(this.mservice.myfavorites));
        this.article.likes--;
        this._http.post('http://127.0.0.1:8000/api/articles/'+this.article.id+'/favoritesDown',{data:this.article.likes}).subscribe((res)=>console.log(res),
        (err) => console.log(err));
       }
       console.log(JSON.parse(localStorage.getItem('myfavorites')!));
     }
}
