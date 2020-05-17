import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPage } from './search';
import { SearchPipe } from '../../pipes/search/search';
import { SearchplatoPipe } from '../../pipes/searchplato/searchplato';

@NgModule({
  declarations: [
    SearchPage,
    SearchPipe,
    SearchplatoPipe,

  ],
  imports: [
    IonicPageModule.forChild(SearchPage),
  ],
})
export class SearchPageModule {}
