import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DeviceResourceService, DeviceDTO } from 'src/app/srvapi';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  private pramsSubscription: Subscription;
  public deviceId: number = -1;
  public device: DeviceDTO = {};


  constructor(private route: ActivatedRoute, private deviceService: DeviceResourceService, private router: Router) { }

  ngOnInit() {
    this.pramsSubscription = this.route.params.subscribe((params: Params) => {
      this.deviceId = params['deviceId'];
      this.loadData()
    });
  }

  ngOnDestroy(): void {
    this.pramsSubscription.unsubscribe()
  }

  loadData() {
    this.deviceService.getDeviceUsingGET(this.deviceId)
      .subscribe(result => this.device = result);
  }

  save() {
    this.deviceService.updateDeviceUsingPUT(this.device).subscribe();
  }

  back() {
    this.router.navigate(['space', this.device.spaceId || -1])
  }

}
