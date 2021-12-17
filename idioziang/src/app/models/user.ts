export class User {
    public id: string ='';
    public email: string='';
    public name: string='';
    public password: string='';
    public roles?:Role;
}
export interface Role{
  name:string;
}
