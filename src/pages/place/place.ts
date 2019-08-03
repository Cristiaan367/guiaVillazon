import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading } from 'ionic-angular';
import { Place } from './../../shared/model/place/place';
import { PlaceMapService } from './../../shared/model/maps/place-map.service';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { AlertController, LoadingController } from 'ionic-angular';
import { ShortenPipe } from "../../pipes/shorten.pipe";
import { PlatosPage } from  '../platos/platos';
import { AuthService } from '../../shared/auth/auth.service';
import { PlaceService } from   '../../shared/model/place/place.service';

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {

  @ViewChild('map') mapElement;
  place: Place;
  placeDescription: string;
  distance: string;
  duration: string;
  isReadingMore: boolean;
  isDisplayingRoute: boolean;
  loading: Loading;
  placeDetail:string;
  ver:boolean = false;
  verDetalle:boolean = false;
  verMapa:boolean = true;
  platosPage = PlatosPage;
  idplace;
  iduser;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     public placeMapService: PlaceMapService, private launchNavigator: LaunchNavigator,
      public alertCtrl: AlertController, public loadingCtrl: LoadingController,
      public auth: AuthService, public placeServ: PlaceService) {
    this.place = navParams.data;
    this.placeDescription = this.shortenDescription(this.place.description);
    this.placeDetail =  this.place.detail;
    this.idplace = this.place.$key;
    this.iduser = this.auth.getid();

    this.mostrar();
  }

  save(){
    const alert = this.alertCtrl.create({
      title: 'Guardado..',
      subTitle: 'Restaurante Guardado Guardado en lista de Favoritos..',
      buttons: ['OK']
    });
    alert.present();
    this.placeServ.savePlace(this.iduser,this.idplace);
    console.log("place: "+this.idplace+" user: "+this.iduser);
  }

  shortenDescription(description: string): string {
    return new ShortenPipe().transform(description, 200, ' ...', false);
  }


  ionViewDidLoad() {
    this.displayPlaceLocation();
  }

  displayRoute() {
    this.showLoading('Calculando ruta...');
    this.resetDistanceAndTime();
    this.isDisplayingRoute = true;
    this.placeMapService.displayRouteToPlace(this.mapElement, this.place.latitude, this.place.longitude)
      .then(this.displayDistanceAndTime.bind(this))
      .catch((err) => {
        this.loading.dismiss();
        this.showAlert(err.message);
      });
  }

  displayPlaceLocation() {
    this.isDisplayingRoute = false;
    this.placeMapService.displayPlacePosition(this.mapElement, this.place);
    this.placeMapService.displayCurrentPosition();
  }

  showLoading(message) {
    this.loading = this.loadingCtrl.create({content: message});
    this.loading.present();
  }

  showAlert(message) {

    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: `Ha ocurrido un error intentado localizar la taberna <strong>${this.place.title}</strong>. No se podrá ubicar en el mapa.<p>Error: ${message}</p>`,
      buttons: ['OK']
    });

    alert.present();

  }

  readMore() {
    this.placeDescription = this.place.description;
    this.isReadingMore = true;
  }

  readLess() {
    this.placeDescription = this.shortenDescription(this.place.description);
    this.isReadingMore = false;
  }

  resetDistanceAndTime() {
    this.distance = '';
    this.duration = '';
  }

  displayDistanceAndTime() {
    this.Alerta();
    this.distance = this.placeMapService.distance;
    this.duration = this.placeMapService.duration;
    this.loading.dismiss();
  }

  navigate() {
    this.launchNavigator.navigate([this.place.latitude, this.place.longitude]);
  }

  mostrar(){
    this.ver = true;
    this.verDetalle= false;
    this.verMapa=false;
  }

  mostrarDetalle(){
    this.ver = false;
    this.verDetalle= true;
    this.verMapa=false;
  }

  mostrarMapa(){
    this.ver = false;
    this.verDetalle= false;
    this.verMapa=true;
  }

  Alerta(){
    const alert = this.alertCtrl.create({
      title: 'Nota GPS',
      subTitle: 'Para Mayor Presision de la ruta debe activar el Gps de su telefono..',
      buttons: ['OK']
    });
    alert.present();
  }

}
