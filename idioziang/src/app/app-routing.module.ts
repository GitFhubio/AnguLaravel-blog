import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminRoutes } from './admin/admin.routes';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ArticleComponent } from './article/article.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [{
  path:'',
  component:HomeComponent
},
{
  path:'register',
  component:RegisterComponent
},
{
  path:'login',
  component:LoginComponent
},
{
  path:'articles/:id',
  component:ArticleComponent
},
{
  path:'admin',
  component:DashboardComponent,
  children:adminRoutes,

},
//va alla fine ** per page not found
{
  path:'**',
  component:Page404Component
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
