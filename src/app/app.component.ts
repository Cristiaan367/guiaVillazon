import { Component, ViewChild } from '@angular/core';
import { Nav,Platform,ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SplashPage } from '../pages/splash/splash';
import { ListAreasPage } from '../pages/list-areas/list-areas';
import { AcercaPage} from '../pages/acerca/acerca';
//import {timer} from 'rxjs/observable/timer';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  showSplash = true;
  rootPage:any = ListAreasPage;
  pushPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, modalCtrl: ModalController,
     ){
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();     
      statusBar.overlaysWebView(false);
      //statusBar.backgroundColorByHexString('#E32727');
      //splashScreen.hide();
      let splash = modalCtrl.create(SplashPage);
      splash.present();
    });

    
  }

  acerca(){
     this.nav.push(AcercaPage);
  }
}

