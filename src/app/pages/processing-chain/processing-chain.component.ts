import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PluginDTO, PluginResourceService, ProcessingChainDTO, ProcessingChainResourceService, SignalProcessorResourceService, SignalProcessorDTO, DeviceResourceService, SpaceResourceService, DeviceDTO, SpaceDTO } from 'src/app/srvapi';

export interface DeviceInSpace {
  device: DeviceDTO;
  space: SpaceDTO;
  isThatSpace?: boolean;
}

@Component({
  selector: 'app-processing-chain',
  templateUrl: './processing-chain.component.html',
  styleUrls: ['./processing-chain.component.scss']
})
export class ProcessingChainComponent implements OnInit {

  constructor(private pluginResource: PluginResourceService, private processingChainResource: ProcessingChainResourceService,
    private signalProcessorService: SignalProcessorResourceService, private deviceResource: DeviceResourceService,
    private spaceService: SpaceResourceService) { }

  @Input()
  public rootId: number;
  @Input()
  public spaceId: number;
  @Output()
  public lastStepDeleted = new EventEmitter<ProcessingChainDTO>();
  public allSteps: ProcessingChainDTO[] = [];
  public devicesInSpace: DeviceInSpace[] = [];
  public plugins: PluginDTO[];
  public signalProcessors: SignalProcessorDTO[];


  ngOnInit() {
    this.signalProcessorService.getSignalProcessorsUsingGET().subscribe(signalProcessors => this.signalProcessors = signalProcessors);
    this.pluginResource.getPluginsUsingGET().subscribe(plugins => this.plugins = plugins);
    this.getSteps();
    this.deviceResource.getDevicesUsingGET().subscribe(devices => {
      this.spaceService.getSpacesUsingGET().subscribe(spaces => {
        this.assignDevicesToSpaces(devices, spaces);
      })
    });
  }

  public onStepAdded() {
    this.getSteps();
  }

  public onStepDeleted(deletedStep: ProcessingChainDTO) {
    var indexOfDeletedItem = this.allSteps.findIndex(elem => elem.id == deletedStep.id);
    this.allSteps.splice(indexOfDeletedItem, 1);
    if (this.allSteps.length == 0) {
      this.lastStepDeleted.emit(deletedStep);
    }
  }

  private getSteps() {
    this.processingChainResource.getProcessingChainStepsUsingGET(this.rootId).subscribe(steps => this.orderSteps(steps));
  }

  private orderSteps(steps: ProcessingChainDTO[]) {
    var currentItem: ProcessingChainDTO = steps.find(elem => elem.id == this.rootId);
    this.allSteps = [];
    this.allSteps.push(currentItem);
    while (currentItem.nextId) {
      currentItem = steps.find(elem => elem.id == currentItem.nextId);
      this.allSteps.push(currentItem);
    }
  }

  private assignDevicesToSpaces(devices: DeviceDTO[], spaces: SpaceDTO[]) {
    var spacesMap = {};
    for (let index = 0; index < spaces.length; index++) {
      spacesMap[spaces[index].id] = spaces[index];

    }
    this.devicesInSpace = devices.map(elem => { return { "device": elem, "space": spacesMap[elem.spaceId], "isThatSpace": elem.spaceId == this.spaceId } });
  }

}
