import { Component, OnInit } from '@angular/core';
import { SignalProcessorResourceService, PluginResourceService, SignalProcessorDTO, PluginDTO } from 'src/app/srvapi';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-signal-processor',
  templateUrl: './signal-processor.component.html',
  styleUrls: ['./signal-processor.component.scss']
})
export class SignalProcessorComponent implements OnInit {

  public signalProcessor: SignalProcessorDTO = {};
  public plugin: PluginDTO = {};
  public plugins: PluginDTO[] = [];
  editorOptions = { theme: 'vs', language: 'json' };
  public markdown = "";

  get pluginClass() {
    return this.signalProcessor.className;
  }

  set pluginClass(value: string) {
    this.signalProcessor.className = value;
    this.plugin = this.findPluginDto(value);
    this.pluginsService.getPluginDocumentationUsingGET(this.signalProcessor.className)
      .subscribe(result => this.markdown = result.content || "");
    this.updateSignalProcessor();
  }

  constructor(private signalProcessorService: SignalProcessorResourceService,
    private pluginsService: PluginResourceService, private route: ActivatedRoute) { }

  ngOnInit() {
    let processorId = +this.route.snapshot.params["processorId"];

    var getPlugins = this.pluginsService.getPluginsUsingGET();
    var getSignalProcessor = this.signalProcessorService.getSignalProcessorUsingGET(processorId);

    forkJoin([getPlugins, getSignalProcessor]).toPromise()
      .then(([plugins, signalProcessor]) => {
        this.plugins = plugins;
        this.signalProcessor = signalProcessor;
        this.plugin = this.findPluginDto(this.signalProcessor.className);
      })
      .then(() => this.pluginsService.getPluginDocumentationUsingGET(this.signalProcessor.className).toPromise())
      .then(result => this.markdown = result.content || "");

  }

  updateSignalProcessor() {
    this.signalProcessorService.updateSignalProcessorUsingPUT(this.signalProcessor).subscribe();
  }

  private findPluginDto(className: String): PluginDTO {
    return this.plugins.find(elem => elem.className == className);
  }

}
