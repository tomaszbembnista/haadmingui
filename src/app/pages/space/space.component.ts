import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Router, Params } from '@angular/router';
import { SpaceResourceService, SpaceDTO } from 'src/app/srvapi';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss']
})
export class SpaceComponent implements OnInit {

  private pramsSubscription: Subscription;

  public spaceId: number = -1;
  public space: SpaceDTO = {};

  constructor(private route: ActivatedRoute, private spaceService: SpaceResourceService) { }

  ngOnInit() {
    this.pramsSubscription = this.route.params.subscribe((params: Params) => {
      this.spaceId = params['spaceId'];
      this.loadData()
    });
  }

  ngOnDestroy(): void {
    this.pramsSubscription.unsubscribe()
  }

  private loadData() {
    if (this.spaceId > -1) {
      this.spaceService.getSpaceUsingGET(this.spaceId)
        .subscribe(result => this.space = result);
    }
  }

  save() {
    this.spaceService.updateSpaceUsingPUT(this.space)
      .subscribe(result => this.space = result);
  }

}
