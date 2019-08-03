import { Observable } from 'rxjs/Observable';
import { Component,ViewChild } from '@angular/core';
import {  Nav,IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../shared/auth/auth.service';
import { LoginPage } from '../login/login';
import { PlaceService } from  '../../shared/model/place/place.service';
import { Place } from '../../shared/model/place/place';
import { PlacePage } from  '../../pages/place/place';
import { ListRestaurantPage } from '../../pages/list-restaurant/list-restaurant';


/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  @ViewChild(Nav) nav: Nav;
  placePage = PlacePage;
  listRestPage = ListRestaurantPage;
  places$: Observable<Place[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth:AuthService,
    public placeServ: PlaceService, public loadCtrl: LoadingController, public alertCtrl: AlertController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage'+this.auth.getEmail());
    const loader = this.loadCtrl.create({
      content: "Cargando Perfil...",
      duration: 1000
    });
    loader.present();
    //this.area = this.navParams.data;
    this.places$ = this.placeServ.findByUser(this.auth.getid());
  }

  logout() {
		this.auth.signOut();
		this.nav.setRoot(LoginPage);
  }

  delete(){
    const alert = this.alertCtrl.create({
      title: 'Limpiar Lista',
      subTitle: 'Lista de Restaurantes Favoritos fue limpiada con exito...',
      buttons: ['OK']
    });
    alert.present();
    this.placeServ.deleteFav(this.auth.getid());
  }


}
