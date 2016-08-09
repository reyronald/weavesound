import {Injectable}     from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class FourSharedFileService  {
    private url = 'api/fourSharedFile';

    constructor(private _http: Http) {
    }

    public getFiles() {    
       return this._http.get(this.url)
            .map( resp => <any[]>resp.json())
            .catch(this.handleError);
    }

    protected handleError(error: Response) {
    	alert('Error: ' + error);
        console.error(error);
        return Observable.throw(error || 'Server error');
    }
}