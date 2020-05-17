import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPlacesPage } from './list-places';
import { buscarpipe } from '../../pipes/buscar';
import { tipopipe } from '../../pipes/tipo';
import { SortByPipe } from '../../pipes/order';

@NgModule({
  declarations: [
    ListPlacesPage,
    buscarpipe,
    tipopipe,
    SortByPipe
  ],
  imports: [
    IonicPageModule.forChild(ListPlacesPage),
  ],
  exports: [
    ListPlacesPage
  ]
})
export class ListPlacesModule {}
