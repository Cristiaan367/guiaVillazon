import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListRestaurantPage } from './list-restaurant';

@NgModule({
  declarations: [
    ListRestaurantPage,
  ],
  imports: [
    IonicPageModule.forChild(ListRestaurantPage),
  ],
})
export class ListRestaurantPageModule {}
