import { Component, ViewChild } from '@angular/core';
import { Nav,Platform,ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { SplashPage } from '../pages/splash/splash';
import { ListAreasPage } from '../pages/list-areas/list-areas';
import { AcercaPage} from '../pages/acerca/acerca';
import { TaxiPage } from '../pages/taxi/taxi';
import { EventosPage } from '../pages/eventos/eventos';
import { BusesPage } from '../pages/buses/buses';
//import {timer} from 'rxjs/observable/timer';
//import {FCM, NotificationData } from '@ionic-native/fcm';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { AuthService } from '../shared/auth/auth.service';
import { SplashPage } from '../pages/splash/splash';
import { PushObject, PushOptions, Push } from '@ionic-native/push';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  showSplash = true;
  rootPage:any= LoginPage;
  pushPage: any;

  //login:any= LoginPage;
  //inicio:any = ListAreasPage;

  constructor( platform: Platform, statusBar: StatusBar, 
    splashScreen: SplashScreen, modalCtrl: ModalController,
    private auth: AuthService, private push: Push){
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();     
      statusBar.overlaysWebView(false);

      //statusBar.backgroundColorByHexString('#E32727');
      //splashScreen.hide();
      let splash = modalCtrl.create(SplashPage);
      splash.present();
      this.pushnoti();
      /*this.fcm.getToken().then(
        (token: string) => {
          console.log("este es el token "+ token);
        }
      ).catch(error =>{
        console.log(error);
      })

      this.fcm.onTokenRefresh().subscribe((token:string) => {
        console.log('actualizar token'+token);
      });
      this.fcm.onNotification().subscribe(data => {
        if(data.wasTapped){
          console.log("estamos en segundo plano"+ JSON.stringify(data));
        }else{
          //en primer plano
          console.log("estamos en primer plano"+ JSON.stringify(data));
        }
      }, error =>{
        console.log("error error"+error);
      });*/



    });

    this.auth.afAuth.authState
      .subscribe(
        user=> {
          if(user){
            this.rootPage = ListAreasPage;
          } else {
            this.rootPage = LoginPage;
          }
        },
        () =>{this.rootPage = LoginPage;}
      );

    
  }


  acerca(){
     this.nav.push(AcercaPage);
  }

  home(){
    this.nav.setRoot(ListAreasPage);
  }

  taxi(){
    this.nav.push(TaxiPage);
  }

  eventoPag(){
    this.nav.push(EventosPage)
  }

  busesPag(){
    this.nav.push(BusesPage);
  }

  logout() {
		this.auth.signOut();
		this.nav.setRoot(LoginPage);
  }
  
  perfil(){
    this.nav.push(PerfilPage);
  }

  pushnoti(){
    const options: PushOptions = {
      android: {
        senderID: '177051075379'
      },
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      }
   };
   
   const pushObject: PushObject = this.push.init(options);
   
   
   pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
   
   pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
   
   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
}

