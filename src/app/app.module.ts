import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID,ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseConfig } from '../config/firebase.config';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MyApp } from './app.component';
import { AuthService } from '../shared/auth/auth.service';
import { AreaService } from '../shared/model/area/area.service';
import { PlaceService } from '../shared/model/place/place.service';
import { PlaceMapService } from '../shared/model/maps/place-map.service';
import { AreaMapService } from '../shared/model/maps/area-map.service';
import { EventService } from '../shared/model/events/events.service';
import { platoService} from '../shared/model/platos/platos.service';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { ListAreasModule } from '../pages/list-areas/list-areas.module';
import { MapPlacesModule } from '../pages/map-places/map-places.module';
import { PlaceModule } from '../pages/place/place.module';
import { ListPlacesModule } from '../pages/list-places/list-places.module';
import { AppPipesModule } from "../pipes/app-pipes.module";
import { SplashPageModule } from '../pages/splash/splash.module';
import { AcercaPageModule } from '../pages/acerca/acerca.module';
import { TaxiPageModule } from '../pages/taxi/taxi.module';
import { EventosPageModule } from '../pages/eventos/eventos.module';
import { BusesPageModule } from '../pages/buses/buses.module';
import { LoginPageModule } from '../pages/login/login.module';
import { PlatosPageModule } from '../pages/platos/platos.module';
//import { PlatosPage } from '../pages/platos/platos';
//import { LoginPage } from '../pages/login/login';
import { PerfilPageModule } from '../pages/perfil/perfil.module';
//import { PerfilPage } from '../pages/perfil/perfil';
import { ListRestaurantPageModule } from '../pages/list-restaurant/list-restaurant.module';
import { NewRestaurantPageModule } from '../pages/new-restaurant/new-restaurant.module';
import { MapRestaurantPageModule } from '../pages/map-restaurant/map-restaurant.module';
import { MapRestaurantPage } from '../pages/map-restaurant/map-restaurant';
import { PictureRestauratPageModule } from '../pages/picture-restaurat/picture-restaurat.module';
//import { PictureRestauratPageModule } from '../pages/picture-restaurat/picture-restaurat.module';
//import { EditRestaurantPageModule } from '../pages/edit-restaurant/edit-restaurant.module';
import {SignupPageModule} from '../pages/signup/signup.module';
import { Network } from '@ionic-native/network'
import { registerLocaleData } from '@angular/common';
import localeEs  from '@angular/common/locales/es';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Push } from '@ionic-native/push';
//import { from } from 'rxjs/observable/from';
import { AgmCoreModule } from '@agm/core';
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    MyApp,
    //LoginPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireDatabaseModule,
    ListAreasModule,
    ListPlacesModule,
    PlaceModule,
    MapPlacesModule,
    AppPipesModule,
    SplashPageModule,
    AcercaPageModule,
    TaxiPageModule,
    EventosPageModule,
    BusesPageModule,
    SignupPageModule,
    PerfilPageModule,
    LoginPageModule,
    PlatosPageModule,
    ListRestaurantPageModule,
    NewRestaurantPageModule,
    MapRestaurantPageModule,
    PictureRestauratPageModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD8fAyrlo8ix9UoFeDFSjQ8rsFDX2wHBvs'
    }),
    //EditRestaurantPageModule,
    //PictureRestauratPageModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapRestaurantPage,
    //PlatosPage,
    //LoginPage,

  ],
  providers: [
    AuthService,
    AreaService,
    PlaceService,
    PlaceMapService,
    AreaMapService,
    EventService,
    platoService,
    LaunchNavigator,
    StatusBar,
    SplashScreen,
    Geolocation,
    Network,
    Push,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: LOCALE_ID, useValue: 'es'},
    AngularFireAuth,
  ]
})
export class AppModule {}
