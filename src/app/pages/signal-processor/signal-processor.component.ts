import { Component, OnInit } from '@angular/core';
import { SignalProcessorResourceService, PluginResourceService, SignalProcessorDTO, PluginDTO } from 'src/app/srvapi';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signal-processor',
  templateUrl: './signal-processor.component.html',
  styleUrls: ['./signal-processor.component.scss']
})
export class SignalProcessorComponent implements OnInit {

  public signalProcessor: SignalProcessorDTO = {};
  public plugin: PluginDTO = {};
  public plugins: PluginDTO[] = [];

  get pluginClass() {
    return this.signalProcessor.className;
  }

  set pluginClass(value: string) {
    this.signalProcessor.className = value;
    this.pluginsService.getPluginUsingGET(value).subscribe(result => this.plugin = result);
    this.updateSignalProcessor();
  }

  constructor(private signalProcessorService: SignalProcessorResourceService,
    private pluginsService: PluginResourceService, private route: ActivatedRoute) { }

  ngOnInit() {
    let processorId = +this.route.snapshot.params["processorId"];
    this.pluginsService.getPluginsUsingGET(true).subscribe(result => {
      this.plugins = result;
    });
    this.signalProcessorService.getSignalProcessorUsingGET(processorId).subscribe(result => { this.signalProcessor = result });
  }

  updateSignalProcessor() {
    this.signalProcessorService.updateSignalProcessorUsingPUT(this.signalProcessor).subscribe();
  }

}
