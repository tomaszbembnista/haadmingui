import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SpaceComponent } from './pages/space/space.component';
import { DeviceComponent } from './pages/device/device.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: "landing-page",
    pathMatch: 'full'
  },
  {
    path: 'space/:spaceId',
    component: SpaceComponent
  },
  {
    path: 'device/:deviceId',
    component: DeviceComponent
  },
  {
    path: 'landing-page',
    component: LandingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
