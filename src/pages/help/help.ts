import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { ListAreasPage } from '../../pages/list-areas/list-areas';
import { LoginPage } from '../../pages/login/login';

/**
 * Generated class for the HelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public nav:Nav) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

  inicio(){
    this.nav.setRoot(LoginPage);
  }



}
