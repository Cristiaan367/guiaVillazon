import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController} from 'ionic-angular';
import { PlaceMapService } from '../../shared/model/maps/place-map.service';
import { PlaceService } from '../../shared/model/place/place.service';
import {Geolocation} from '@ionic-native/geolocation';
import { Location } from '../../shared/model/location/location';
import { Place } from '../../shared/model/place/place';
import { PictureRestauratPage } from '../../pages/picture-restaurat/picture-restaurat';
//import { platoService } from '../../shared/model/platos/platos.service';
//import { Geolocation } from '@ionic-native/geolocation';
//declare var google;
//import { LaunchNavigator } from '@ionic-native/launch-navigator';
/**
 * Generated class for the MapRestaurantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-map-restaurant',
  templateUrl: 'map-restaurant.html',
})
export class MapRestaurantPage {
  //@ViewChild('map') mapElement;
  
  //map: any
  lat: number = 51.678418;
  lng: number = 7.809007;
  title: string = 'Arrastre el marcador  hasta la posicion de su resataurante'
  //lat: number;
  //lng: number;
  categoria;
  cordenadas;
  place: Place;
  location:Location;
  locationIsSet = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public mapService: PlaceMapService,
    public geolocation:Geolocation, public platform: Platform, public placeService: PlaceService,
    public alertCtrl : AlertController ) {
      this.place = navParams.data; 
      this.ioniciarGeolocalizacion();
  }


  ionViewDidLoad() {
    /*this.mapService.displayCurrentPosition();
    console.log('ionViewDidLoad MapRestaurantPage');
    const position = new google.maps.LatLng(-21.763409, -43.349034);

    const mapOptions = {
      zoom: 18,
      center: position,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    const marker = new google.maps.Marker({
      position: position,
      map: this.map,

      //Titulo
      //title: 'Minha posição',

      //Animção
      //animation: google.maps.Animation.DROP, // BOUNCE

      //Icone
      //icon: 'assets/imgs/pessoa.png'
    });*/
  }

  mapa(){
    console.log(this.lat+'/'+this.lng)
    this.placeService.guardarCordenadas(this.categoria.key$, this.lat, this.lng);
    //this.placeService.guardarCordenadas(this.categoria.$key, this.lat, this.lng);

  }
  dragEnd($event) {
    this.lat= $event.coords.lat;
    this.lng = $event.coords.lng;
    //this.form.patchValue({ latitude: $event.coords.lat, longitude: $event.coords.lng });
  }

  actual(){
    console.log(this.lat, this.lng);
    this.placeService.saveCords(this.lat, this.lng, this.place)
    this.alerta();
    this.navCtrl.pop();
    //this.navCtrl.push( PictureRestauratPage );
  }

  ioniciarGeolocalizacion(){
    this.geolocation.getCurrentPosition().then((resp)=>{
      console.log(resp.coords);
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    }).catch((error)=>{
      console.log('error getting location', error);
    });

    
  }

  alerta(){
    const alert = this.alertCtrl.create({
      title: 'guardado',
      subTitle: 'posicion Guardada exitosamente',
      buttons: ['Aceptar']
    });
    alert.present();
  }

  cancelar(){
    this.navCtrl.pop();
  }

  ayuda() {
    const alert = this.alertCtrl.create({
      title: 'Ayuda',
      subTitle: 'Active su GPS Para que la aplicacion detecte la posicion actual de su dispositivo o arrastre el marcador del mapa hacia la pocision en que se encuentra su restaurante',
      buttons: ['OK']
    });
    alert.present();
  }
 
}
