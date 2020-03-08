import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProcessingChainDTO, SignalProcessorResourceService, SignalProcessorDTO, DeviceResourceService, DeviceDTO, ProcessingChainResourceService } from 'src/app/srvapi';
import { DeviceInSpace } from './processing-chain.component';

@Component({
  selector: 'app-processing-chain-element',
  templateUrl: './processing-chain-element.component.html',
  styleUrls: ['./processing-chain.component.scss']
})
export class ProcessingChainElementComponent implements OnInit {

  @Input()
  public processingChainElement: ProcessingChainDTO;
  @Input()
  public signalProcessors: SignalProcessorDTO[];
  @Input()
  public devicesInSpace: DeviceInSpace[] = [];
  @Output() nextStepAdded = new EventEmitter<boolean>();
  @Output() nextStepDeleted = new EventEmitter<ProcessingChainDTO>();




  constructor(private processingChainService: ProcessingChainResourceService) { }

  ngOnInit() {


  }

  updateProcessingChainElement(): Promise<ProcessingChainDTO> {
    return this.processingChainService.updateProcessingChainUsingPUT(this.processingChainElement).toPromise();
  }

  addNextStep() {

    var nextElement: ProcessingChainDTO = { nextId: this.processingChainElement.nextId };
    this.processingChainService.createProcessingChainUsingPOST(nextElement).toPromise()
      .then(value => {
        this.processingChainElement.nextId = value.id;
        return this.updateProcessingChainElement();
      })
      .then(() => this.nextStepAdded.emit(true));

  }

  deleteStep() {
    //this.processingChainService.s
  }

}
