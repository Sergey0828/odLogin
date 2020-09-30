import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './public/register/register.module#RegisterPageModule' },
  { path: 'members', canActivate: [AuthGuard], loadChildren: './members/member-routing.module#MemberRoutingModule' },
  // { path: 'home',loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'login', loadChildren: () => import('./public/login/login.module').then( m => m.LoginPageModule) },
  // { path: 'register', loadChildren: () => import('./public/register/register.module').then( m => m.RegisterPageModule) },
  // { path: 'dashboard', loadChildren: () => import('./members/dashboard/dashboard.module').then( m => m.DashboardPageModule) },
];

@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
