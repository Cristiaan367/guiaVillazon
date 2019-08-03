import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PicturesRestaurantPage } from './pictures-restaurant';

@NgModule({
  declarations: [
    PicturesRestaurantPage,
  ],
  imports: [
    IonicPageModule.forChild(PicturesRestaurantPage),
  ],
})
export class PicturesRestaurantPageModule {}
