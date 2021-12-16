import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page404/page404.component';
import { ArticleComponent } from './article/article.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { FormComponent } from './form/form.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
import { UpdateRolesComponent } from './admin/update-roles/update-roles.component';

export function tokenGetter(): any {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Page404Component,
    ArticleComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    HomeAdminComponent,
    FormComponent,
    AdminListComponent,
    UpdateRolesComponent
  ],
  imports: [
    JwtModule,
    ReactiveFormsModule, //vitafounder way
    FormsModule,
    FontAwesomeModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
      tokenGetter: (tokenGetter),
      allowedDomains: ['localhost:4200'],
      disallowedRoutes: ['localhost:4200/admin/']
      }
      })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
