import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapRestaurantPage } from './map-restaurant';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    MapRestaurantPage,
  ],
  imports: [
    IonicPageModule.forChild(MapRestaurantPage),
    AgmCoreModule
  ],
})
export class MapRestaurantPageModule {}
