import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageImgListComponent } from './pages/page-img-list/page-img-list.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthServiceGuard } from './services/login-service/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', redirectTo: 'home/image-list', pathMatch: 'full' },
  {
    canActivate: [AuthServiceGuard],
    path: 'home',
    component: PageHomeComponent,
    children: [
      { path: 'image-list', component: PageImgListComponent}
    ],
  },
  { path: 'login', component: LoginPageComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
