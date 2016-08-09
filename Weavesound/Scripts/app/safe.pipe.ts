import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizationService} from '@angular/platform-browser';

@Pipe({name: 'safe'})
export class SafePipe implements PipeTransform {
    constructor(private _sanitizer : DomSanitizationService) {
    }

    transform(url : string) {
        return this._sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}