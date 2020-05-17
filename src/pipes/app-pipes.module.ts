import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShortenPipe } from './shorten.pipe';
//import { SearchPipe } from './search/search';
//import { SearchplatoPipe } from './searchplato/searchplato';

@NgModule({
  declarations: [
    ShortenPipe,
  ],
  imports: [
    IonicPageModule.forChild(ShortenPipe),
  ],
  exports: [
    ShortenPipe
  ]
})
export class AppPipesModule {}
