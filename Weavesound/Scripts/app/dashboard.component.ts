import {
	Component,
	Output,
	EventEmitter,
	OnInit
} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {BroadcastService} from './broadcast.service';
import {FourSharedFileService} from './services/fourSharedFile.service';

@Component({
	templateUrl: '/Scripts/app/dashboard.html',
    providers: [
		HTTP_PROVIDERS,
    	FourSharedFileService,
    ]
})
export class DashboardComponent implements OnInit {
	private _files : any[];

	constructor(
		private _fourSharedFileService: FourSharedFileService,
		private _broadcastService: BroadcastService) {
	}

	ngOnInit() {
		this._fourSharedFileService.getFiles()
			.subscribe(
				result => {
					console.log(result);
					this._files = result;
				},
				error => {

				});
	}

	onChangeSong(fileId : string) : void {
		this._broadcastService.subject.next(fileId);			
	}
}