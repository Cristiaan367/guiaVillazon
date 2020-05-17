import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginRestaurantPage } from './login-restaurant';

@NgModule({
  declarations: [
    LoginRestaurantPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginRestaurantPage),
  ],
})
export class LoginRestaurantPageModule {}
