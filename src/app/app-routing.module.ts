import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
  {path: '', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)},
  {path: '', loadChildren: () => import('./pages/vocational-test/vocational-test.module').then(m => m.VocationalTestModule)},
  {path: '', loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
