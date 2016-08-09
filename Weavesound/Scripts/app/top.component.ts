import {Component} from '@angular/core';
import {BroadcastService} from './broadcast.service';

@Component({
    template: '<button (click)="onChangeSong()">change song top</button>',
})
export class TopComponent {
	constructor(private _broadcastService: BroadcastService) { }

	onChangeSong() : void {
		this._broadcastService.subject.next('4xm5S60uce');
	}
}