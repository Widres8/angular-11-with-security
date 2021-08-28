import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

// modules
import { PagesRoutingModule } from './pages-routing.module';

import { SharedModule } from '../shared/shared.module';

// Components
import { PagesComponent } from './pages.component';
import { SavingsAccountComponent } from './savings-account/savings-account.component';

@NgModule({
  declarations: [
    // Root
    PagesComponent,
    // Home
    SavingsAccountComponent,
  ],
  imports: [SharedModule, PagesRoutingModule],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {}
