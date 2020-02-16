import { Component, OnInit, Input } from '@angular/core';
import { DeviceResourceService, SpaceResourceService, DeviceDTO } from 'src/app/srvapi';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  private _spaceId: number = -1;
  private devices: DeviceDTO[] = [];

  @Input()
  public set spaceId(spaceId: number) {
    this._spaceId = spaceId;
    this.loadData();
  }

  public get spaceId() {
    return this._spaceId;
  }

  constructor(private deviceResource: DeviceResourceService, private spaceResource: SpaceResourceService, private router: Router) { }


  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.spaceResource
      .getDevicesBelongingToSpaceUsingGET(this.spaceId)
      .subscribe(result => this.devices = result);
  }

  addNew() {
    let spaceId = this.spaceId > -1 ? this.spaceId : undefined;
    let toAdd: DeviceDTO = { spaceId: spaceId, name: "", slug: "" };
    this.deviceResource
      .createDeviceUsingPOST(toAdd)
      .subscribe(createdDevice => this.showDevice(createdDevice));
  }

  showDevice(device: DeviceDTO) {
    this.router.navigate(['device', device.id]);
  }

  deleteDevice(device: DeviceDTO, event) {
    event.stopPropagation();
    this.deviceResource.deleteDeviceUsingDELETE(device.id).subscribe(result => {
      var index = this.devices.findIndex(elem => elem.id == device.id);
      this.devices.splice(index, 1);
    });
  }

}
