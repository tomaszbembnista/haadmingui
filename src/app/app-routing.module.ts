import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SpaceComponent } from './pages/space/space.component';


const routes: Routes = [
  {
    path: 'landingPage',
    component: LandingPageComponent
  },
  {
    path: 'space/:spaceId',
    component: SpaceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
