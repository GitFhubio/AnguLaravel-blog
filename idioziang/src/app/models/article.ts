export class Article {
  id?:number;
  title?: string;
 content?: string;
  user_id?:number;
  comments: any[]=[];
  categories:any[]=[];
  tags:any[]=[];
  author:Author= {};
}

export interface Author {
  name?:string;
}
