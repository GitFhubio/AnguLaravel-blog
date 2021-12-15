import { Routes } from "@angular/router";
import { FormComponent } from "../form/form.component";
import { LogoutComponent } from "../logout/logout.component";
import { AdminListComponent } from "./admin-list/admin-list.component";
import { HomeAdminComponent } from "./home-admin/home-admin.component";
import { UpdateRolesComponent } from "./update-roles/update-roles.component";

export const adminRoutes: Routes = [
 { path: '', component: HomeAdminComponent},
 {path: 'users', component: AdminListComponent},
{path: 'create-article', component:FormComponent},
{path: 'logout', component:LogoutComponent},
{path: 'update-role/:id', component:UpdateRolesComponent},
]
