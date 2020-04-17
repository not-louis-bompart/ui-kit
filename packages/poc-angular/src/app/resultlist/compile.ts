import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from '../../environments/environment';
import { ResultListModule } from './resultlist.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
   .bootstrapModule(ResultListModule)
   .catch(err => console.error(err));
