import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';

import {BroadcastService} from './broadcast.service';

bootstrap(AppComponent, [BroadcastService]);
