import { Component, OnInit } from '@angular/core';
import { SignalProcessorResourceService, SignalProcessorDTO, PluginResourceService, PluginDTO } from 'src/app/srvapi';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

export class ProcessorWithPlugin {
  constructor(public processor: SignalProcessorDTO, public plugin: PluginDTO) { }


  displayName(): string {
    var processorName = "";
    if (this.processor && this.processor.name) {
      processorName = this.processor.name;
    }
    var pluginName = "";
    if (this.plugin) {
      if (this.plugin.displayName) {
        pluginName = this.plugin.displayName;
      } else {
        pluginName = this.plugin.className;
      }
      pluginName = "(" + pluginName + ")";
    }

    return (processorName + " " + pluginName).trim();
  }

}

@Component({
  selector: 'app-signal-processors',
  templateUrl: './signal-processors.component.html',
  styleUrls: ['./signal-processors.component.scss']
})
export class SignalProcessorsComponent implements OnInit {

  public processorsWithPlugins: ProcessorWithPlugin[] = [];

  constructor(private signalProcessorService: SignalProcessorResourceService, private pluginsService: PluginResourceService,
    private router: Router) { }

  ngOnInit() {
    forkJoin(
      this.signalProcessorService.getSignalProcessorsUsingGET(),
      this.pluginsService.getPluginsUsingGET()
    ).subscribe(([signalProcessors, plugins]) => {
      this.joinProcessorsWithPlugins(signalProcessors, plugins);
    });
  }

  public showProcessor(processorWithPlugin: ProcessorWithPlugin) {
    this.router.navigate(['processor', processorWithPlugin.processor.id]);
  }

  private joinProcessorsWithPlugins(signalProcessors: SignalProcessorDTO[], plugins: PluginDTO[]) {
    this.processorsWithPlugins = signalProcessors.map(elem => { return new ProcessorWithPlugin(elem, this.findPlugin(elem.className, plugins)) });
  }

  private findPlugin(className: String, plugins: PluginDTO[]) {
    return plugins.find(elem => elem.className == className);
  }

  addNew() {
    var newOne: SignalProcessorDTO = {};
    newOne.name = "new";
    newOne.className = "";
    this.signalProcessorService.createSignalProcessorUsingPOST(newOne)
      .toPromise().then(result => this.router.navigate(['processor', result.id]));
  }

  delete(toDelete: SignalProcessorDTO, event: any) {
    event.stopPropagation();
    //TODO: show confirmation popup
    this.signalProcessorService.deleteSignalProcessorUsingDELETE(toDelete.id).subscribe(
      () => {
        var index = this.processorsWithPlugins.findIndex(item => item.processor.id == toDelete.id);
        this.processorsWithPlugins.splice(index, 1);
      }
    );
  }





}
