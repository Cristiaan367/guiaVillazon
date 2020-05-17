import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPlatoPage } from './new-plato';

@NgModule({
  declarations: [
    NewPlatoPage,
  ],
  imports: [
    IonicPageModule.forChild(NewPlatoPage),
  ],
  exports: [
    NewPlatoPage
  ]
})
export class NewPlatoPageModule {}
