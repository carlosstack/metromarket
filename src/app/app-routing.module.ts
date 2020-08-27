import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './modules/main/pages/home/home.component';
import { AuthGuard } from './core/guards/auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: HomeComponent},
  { path: 'app', loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule) , canLoad:[AuthGuard]},
  { path: '**', redirectTo: 'app',pathMatch:'full' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        preloadingStrategy: PreloadAllModules
      })
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
