import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Article } from './models/article';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Category } from './models/category';
import { Tag } from './models/tag';
import { catchError, map } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { User } from './models/user';
@Injectable({
  providedIn: 'root'
})
export class MainService implements CanActivate {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(public http:HttpClient,private router: Router,public jwtHelper: JwtHelperService) {
  }
  onSearchByTag:(string|boolean)[]=[];
  onSearchByCat:(string|boolean)[]=[];
  nullSrc:string="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png";

allArticles(){
  return this.http.get<Article[]>('http://127.0.0.1:8000/api/articles');
}
allCategories(){
  return this.http.get<Category[]>('http://127.0.0.1:8000/api/categories');
}
articlesByTag(param:string){
  return this.http.get<Article[]>('http://127.0.0.1:8000/api/articles-by-tag/'+param);
}
articlesByCat(param:string){
  return this.http.get<Article[]>('http://127.0.0.1:8000/api/articles-by-cat/'+param);
}
allTags(){
  return this.http.get<Tag[]>('http://127.0.0.1:8000/api/tags');
}
showArticle(id:number){
  return this.http.get<Article>('http://127.0.0.1:8000/api/articles/'+id);
}
canActivate(): any {
  if (!this.loggedIn()) {
    this.router.navigate(['/login']);
    return false;
  }
  return true;
}
loggedIn(): any {
  return !this.jwtHelper.isTokenExpired();
}
current(key:any) {
  return localStorage.getItem(key);
}
login(user: User): Observable<any> {
  return this.http.post(' http://127.0.0.1:8000/api/login', user)
    .pipe(
      map((response: any) => {
        const token = response.token;
        console.log('Response token:' + response.token);
        if (token) {
          // this.token = token;
          localStorage.setItem('token',response.token);
          localStorage.setItem('roles',response.roles);
          localStorage.setItem('id',response.id);
          return true;
        } else {
          return false;
        }
      })
      ,
      catchError(this.errorHandler)
    );
}
register(user:User): Observable<any> {
  return this.http.post('http://127.0.0.1:8000/api/register', user)
    .pipe(
      map((response) => response),
      catchError(this.errorHandler)
    );
}
errorHandler(error: HttpErrorResponse): any {
  return throwError(error.error || {message: 'Server Error'});
}

logout(): void {
  // this.token ='';
  localStorage.removeItem('token');
  localStorage.removeItem('roles');
  localStorage.removeItem('id');
  console.log('you are logged out!');
  this.router.navigate(['/']);
}

deleteArticle(article:Article): Observable<any> {
  return this.http.delete('http://127.0.0.1:8000/api/articles/'+article.id, {headers: this.headers});
}

getUsers() {
  return this.http.get<User[]>(`http://127.0.0.1:8000/api/users`);
}
private variable = new Subject<Article[]>();
variableChanged$= this.variable.asObservable();

changeVariable(u:Article[]){
this.variable.next(u);
}
}
