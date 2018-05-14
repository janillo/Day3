import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';

@NgModule({
	imports: [ CommonModule, LayoutRoutingModule, AppMaterialModule ],
	declarations: [ LayoutComponent, HeaderComponent, ContentComponent ]
})
export class LayoutModule {}
