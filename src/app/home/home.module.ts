import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { EditRowComponent } from './edit-row/edit-row.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent, EditRowComponent],
  imports: [CommonModule, HomeRoutingModule, MatTableModule, SharedModule],
  entryComponents: [EditRowComponent]
})
export class HomeModule {}
