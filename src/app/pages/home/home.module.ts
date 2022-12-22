import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { HomeComponent } from './home.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
];

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
  exports: [RouterModule],
})
export class HomeModule { }
