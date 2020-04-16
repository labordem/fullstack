import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LayoutFooterComponent } from './components/layout-footer/layout-footer.component';
import { LayoutProfileComponent } from './components/layout-profile/layout-profile.component';
import { LayoutSettingsComponent } from './components/layout-settings/layout-settings.component';
import { GraphQLModule } from './graphql.module';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    LayoutComponent,
    LayoutSettingsComponent,
    LayoutProfileComponent,
    LayoutFooterComponent,
  ],
  imports: [SharedModule, HttpClientModule, RouterModule, GraphQLModule],
  exports: [LayoutComponent],
})
export class CoreModule {}
