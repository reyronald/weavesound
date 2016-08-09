import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Rx';

@Injectable()
export class BroadcastService
{
	public subject = new Subject();
}