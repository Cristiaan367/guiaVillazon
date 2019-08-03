import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusesPage } from './buses';

@NgModule({
  declarations: [
    BusesPage,
  ],
  imports: [
    IonicPageModule.forChild(BusesPage),
  ]
})
export class BusesPageModule {}
