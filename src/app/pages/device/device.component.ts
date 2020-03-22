import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DeviceResourceService, DeviceDTO, ProcessingChainDTO, ProcessingChainResourceService } from 'src/app/srvapi';
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
  public outputProcessors: ProcessingChainDTO[];


  constructor(private route: ActivatedRoute, private deviceService: DeviceResourceService, private router: Router,
    private processingChainResource: ProcessingChainResourceService) { }

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
    this.deviceService.getOutputProcessingChainsUsingGET(this.deviceId)
      .subscribe(result => this.outputProcessors = result);
  }

  save() {
    this.deviceService.updateDeviceUsingPUT(this.device).subscribe();
  }

  back() {
    this.router.navigate(['space', this.device.spaceId || -1])
  }

  addNewProcessor() {
    this.processingChainResource.createProcessingChainUsingPOST({ inputDeviceId: this.device.id })
      .toPromise()
      .then(() => this.deviceService.getOutputProcessingChainsUsingGET(this.deviceId).toPromise())
      .then(result => this.outputProcessors = result);
  }

  onProcessorChainDeleted(deleted: ProcessingChainDTO) {
    var deletedIndex = this.outputProcessors.findIndex(elem => elem.id == deleted.id);
    this.outputProcessors.splice(deletedIndex, 1);
  }

}
