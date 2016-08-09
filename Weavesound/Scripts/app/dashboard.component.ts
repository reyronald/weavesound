import {Component, Output, EventEmitter} from '@angular/core';
import {BroadcastService} from './broadcast.service';

@Component({
    template: '<button (click)="onChangeSong()">change song dashboard</button>',
})
export class DashboardComponent {
	constructor(private _broadcastService: BroadcastService) { }

	onChangeSong() : void {
		this._broadcastService.subject.next('HOfXwfLcba');
	}
}