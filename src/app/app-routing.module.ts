import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuardService } from './services/authguard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(h => h.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(l => l.LogInModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then(s => s.SignUpModule),
  },

  {
    path: 'question-page',
    loadChildren: () => import('./pages/question-page/question-page.module').then(q => q.QuestionModule)
  },
  {
    path: 'result',
    loadChildren: () => import('./pages/result/result.module').then(r => r.ResultModule)
  },
  {
    path: 'show-result',
    loadChildren: () => import('./pages/show-result/show-result.module').then(sh => sh.ShowResultModule)
  },
  {
    path: 'result-emotional',
    loadChildren: () => import('./pages/result-emotional/result-emotional.module').then(re => re.ResultEmotionalModule)
  },
  {
    path: 'solutions',
    loadChildren: () => import('./pages/solutions/solutions.module').then(s => s.SolutionsModule)
  },
  {
    path: 'more-benefits',
    loadChildren: () => import('./pages/more-benefits/more-benefits.module').then(mr => mr.MoreBenefitsModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./pages/contact-us/contact-us.module').then(c => c.ContactModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./pages/terms-service/terms-service.module').then(t => t.TermsModule)
  },

  {
    path: 'plans',
    loadChildren: () => import('./pages/plans/plans.module').then(h => h.PlansModule)
  },
  {
    component: NotFoundComponent,
    path: '404',
  },
  {
    component: NotFoundComponent,
    path: '**'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
