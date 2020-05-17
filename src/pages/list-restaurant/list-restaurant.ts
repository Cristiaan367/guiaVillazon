import { Observable } from 'rxjs/Observable';
import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, AlertController } from 'ionic-angular';
import { NewRestaurantPage} from '../new-restaurant/new-restaurant';
import { PlaceService } from '../../shared/model/place/place.service';
import { MapRestaurantPage } from '../../pages/map-restaurant/map-restaurant';
import { Place } from '../../shared/model/place/place';
import { EditRestaurantPage } from '../../pages/edit-restaurant/edit-restaurant';
import { PictureRestauratPage } from '../../pages/picture-restaurat/picture-restaurat';
import { AuthService } from '../../shared/auth/auth.service';
import { NewPlatoPage } from '../new-plato/new-plato';
import { ComentariosPage } from '../comentarios/comentarios';
/**
 * Generated class for the ListRestaurantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-restaurant',
  templateUrl: 'list-restaurant.html',
})
export class ListRestaurantPage {

  @ViewChild(Nav) nav: Nav;
  newRestPage = NewRestaurantPage;
  mapRestPage = MapRestaurantPage;
  editRestPage = EditRestaurantPage;
  pictRestPage = PictureRestauratPage;
  newPlato = NewPlatoPage;
  comentarioPage = ComentariosPage;
  idUser
  places$: Observable<Place[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public placeServ: PlaceService, public alertCtrl: AlertController,
    public auth:AuthService) {
    //this.idUser = navParams.data;
    this.idUser = auth.getid();
  }

  ionViewDidLoad() {
    console.log('Cargando lugares del usuario: '+ this.idUser);
    this.showAlert();
    this.cargarDatos();
  }

  cargarDatos(){
    this.places$ = this.placeServ.findByAdmin(this.idUser);
  }

  delete(place: Place) {
    const confirm = this.alertCtrl.create({
      title: 'Esta seguro?',
      message: 'Se eliminara el restaurante de forma premanete?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.placeServ.delete(place, this.idUser);
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Mi Restaurante',
      subTitle: 'Las sugerencias de restaurante que son enviadas en esta aplicacion seran habilitadas por el administrador de la aplicacion.',
      buttons: ['Aceptar']
    });
    alert.present();
  }

}
