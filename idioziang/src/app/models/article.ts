export class Article {
  id?:number|string;
  title?: string;
  content?: string;
  img?:string;
  user_id?:number|string;
  comments: any[]=[];
  categories:any[]=[];
  tags:any[]=[];
  author:Author= {};
}

export interface Author {
  name?:string;
}
