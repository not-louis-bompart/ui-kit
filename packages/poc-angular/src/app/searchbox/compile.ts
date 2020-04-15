import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from '../../environments/environment';
import { SearchboxModule } from './searchbox.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
   .bootstrapModule(SearchboxModule)
   .catch(err => console.error(err));
