import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SpaceComponent } from './pages/space/space.component';
import { DeviceComponent } from './pages/device/device.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: "/space/-1",
    pathMatch: 'full'
  },
  {
    path: 'space/:spaceId',
    component: SpaceComponent
  },
  {
    path: 'device/:deviceId',
    component: DeviceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
