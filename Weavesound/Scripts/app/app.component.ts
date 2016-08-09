import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';

import {DashboardComponent} from './dashboard.component';
import {TopComponent} from './top.component';

import {BroadcastService} from './broadcast.service';

import {SafePipe} from './safe.pipe';

@Component({
    selector: 'my-app',
    templateUrl: '/app/app.html', 
    directives: [ROUTER_DIRECTIVES],
	providers: [
		ROUTER_PROVIDERS,
	],
	pipes: [SafePipe],
})
@RouteConfig([
	{
		path: '/',
		name: 'Dashboard',
		component: DashboardComponent,
		useAsDefault: true,
	},
	{
		path: '/top',
		name: 'Top',
		component: TopComponent
	},
])
export class AppComponent 
{ 
	public songId: string = 'oj92psN6';

	get iframeUrl() : string {
		return `http://www.4shared.com/web/embed/audio/file/${this.songId}?type=NORMAL&widgetWidth=530&showArtwork=true&playlistHeight=0&widgetRid=106264768580`;
	}

	constructor(private _broadcastService: BroadcastService) {
		this._broadcastService.subject.subscribe(s => this.changeSong(<string>s));
	}

	changeSong(msg : string) : void {
		this.songId = msg;
	}
}
