export class Article {
  id:number|string = 1;
  title?: string;
  content?: string;
  img?:string;
  user_id?:number|string;
  comments: any[]=[];
  categories:any[]=[];
  tags:any[]=[];
  likes:number= 0;
  author:Author= {};
}

export interface Author {
  name?:string;
}
