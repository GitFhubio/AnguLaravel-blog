import { Routes } from "@angular/router";
import { AuthGuardService } from "../auth-guard.service";
import { FormComponent } from "../form/form.component";
import { LogoutComponent } from "../logout/logout.component";
import { AdminListComponent } from "./admin-list/admin-list.component";
import { HomeAdminComponent } from "./home-admin/home-admin.component";
import { UpdateRolesComponent } from "./update-roles/update-roles.component";

export const adminRoutes: Routes = [
 { path: '', component: HomeAdminComponent,
 canActivate:[AuthGuardService],
 data: { roles: ['writer','editor','admin','superadmin']}},
 {path: 'users', component: AdminListComponent,
 canActivate:[AuthGuardService],
 data: { roles: ['superadmin','admin']}
},
{path: 'create-article', component:FormComponent,
canActivate:[AuthGuardService],
data: { roles: ['writer']}},
{path: 'logout', component:LogoutComponent},
{path: 'update-article/:idU/:idA', component:FormComponent,
canActivate:[AuthGuardService],
data: { roles: ['editor']}},
{path: 'update-role/:id', component:UpdateRolesComponent},
]
